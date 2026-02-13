import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCommandPalette } from '../context/CommandPaletteContext';
import { Search, Compass, CalendarDays, Users2 } from 'lucide-react';
import { useMemo } from 'react';

type CommandKind = 'route' | 'society' | 'event';

interface CommandItem {
  id: string;
  kind: CommandKind;
  label: string;
  meta?: string;
  to?: string;
}

export const CommandPalette = () => {
  const { open, query, setQuery, closePalette } = useCommandPalette();
  const { societies, events } = useData();
  const navigate = useNavigate();

  const items = useMemo<CommandItem[]>(() => {
    const routes: CommandItem[] = [
      { id: 'route-dashboard', kind: 'route', label: 'Dashboard', meta: 'View overview analytics', to: '/' },
      { id: 'route-societies', kind: 'route', label: 'Societies', meta: 'Browse all societies', to: '/societies' },
      { id: 'route-events', kind: 'route', label: 'Events', meta: 'See all events', to: '/events' },
      { id: 'route-ai', kind: 'route', label: 'AI Hub', meta: 'AI co-pilot recommendations', to: '/ai' },
    ];

    const societyItems: CommandItem[] = societies.map((s) => ({
      id: `soc-${s.id}`,
      kind: 'society',
      label: s.name,
      meta: `${s.category} · ${s.members} members`,
    }));

    const eventItems: CommandItem[] = events.map((e) => ({
      id: `evt-${e.id}`,
      kind: 'event',
      label: e.name,
      meta: `${e.society} · ${e.date}`,
    }));

    const q = query.trim().toLowerCase();
    const all = [...routes, ...societyItems, ...eventItems];
    if (!q) return all;
    return all.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.meta && item.meta.toLowerCase().includes(q)),
    );
  }, [societies, events, query]);

  const handleSelect = (item: CommandItem) => {
    closePalette(); // Close the modal FIRST
    if (item.kind === 'route' && item.to) {
      setTimeout(() => navigate(item.to!), 50); // Tiny delay to let the animation start
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card w-full max-w-3xl border-white/20 bg-slate-950/80 p-3 shadow-soft"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-base text-slate-200">
              <Search className="h-5 w-5 text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search routes, societies, events…"
                className="h-10 flex-1 bg-transparent text-lg text-slate-100 outline-none placeholder:text-slate-500"
              />
              <span className="hidden rounded-full border border-slate-700 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">
                ⌘K
              </span>
            </div>

            <div className="mt-2 max-h-[50vh] overflow-y-auto rounded-2xl bg-slate-950/60 p-2 text-base">
              {items.length === 0 ? (
                <div className="px-3 py-4 text-center text-[11px] text-slate-500">
                  No results. Try another keyword.
                </div>
              ) : (
                items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left text-slate-200 transition hover:bg-white/10"
                  >
                    {item.kind === 'route' && (
                      <Compass className="h-5 w-5 text-neonCyan" />
                    )}
                    {item.kind === 'society' && (
                      <Users2 className="h-5 w-5 text-neonPurple" />
                    )}
                    {item.kind === 'event' && (
                      <CalendarDays className="h-5 w-5 text-emerald-400" />
                    )}
                    <div className="flex flex-1 flex-col">
                      <span className="text-base font-medium">{item.label}</span>
                      {item.meta && (
                        <span className="text-sm text-slate-500">
                          {item.meta}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

