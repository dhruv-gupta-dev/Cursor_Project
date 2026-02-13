import { Bell, Search, ChevronDown, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-neonCyan to-neonPurple text-slate-900 shadow-glow">
            <span className="text-lg font-black">CS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">
              College Societies
            </span>
            <span className="text-[11px] text-slate-400">Management Console</span>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
          <span className="inline-flex items-center gap-1 rounded-2xl border border-neonCyan/30 bg-slate-900/60 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-neonCyan shadow-soft">
            <Sparkles className="h-3 w-3" />
            Premium SaaS
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="hidden max-w-xs flex-1 items-center sm:flex">
          <div className="relative w-full">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search societies, events, members..."
              className="w-full rounded-3xl border border-white/10 bg-slate-900/60 py-2 pl-9 pr-3 text-xs text-slate-200 shadow-soft outline-none ring-0 transition placeholder:text-slate-500 focus:border-neonCyan/60 focus:ring-1 focus:ring-neonCyan/60"
            />
          </div>
        </div>

        <ThemeToggle />

        <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70 text-slate-200 shadow-soft transition hover:border-neonCyan/50 hover:text-neonCyan">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-neonCyan/40 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neonCyan" />
          </span>
        </button>

        <button className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-slate-900/70 px-2 py-1.5 text-xs text-slate-200 shadow-soft transition hover:border-neonCyan/50 hover:bg-slate-800/80">
          <div className="flex h-7 w-7 items-center justify-center rounded-2xl bg-gradient-to-tr from-neonCyan/40 to-neonPurple/40 text-[11px] font-semibold text-slate-900 shadow-glow">
            AK
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-[11px] font-medium">Alex Kumar</span>
            <span className="text-[10px] text-slate-400">Council Admin</span>
          </div>
          <ChevronDown className="hidden h-3 w-3 text-slate-400 sm:block" />
        </button>
      </div>
    </header>
  );
};

