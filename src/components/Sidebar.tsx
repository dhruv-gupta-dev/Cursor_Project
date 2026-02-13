import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users2, CalendarDays, Sparkles } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/societies', label: 'Societies', icon: Users2 },
  { to: '/events', label: 'Events', icon: CalendarDays },
  { to: '/ai', label: 'AI Hub', icon: Sparkles },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 248 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card sticky top-0 hidden h-screen flex-col border-white/10 bg-slate-900/40 p-3 shadow-soft lg:flex"
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-neonCyan to-neonPurple text-slate-900 shadow-glow">
              <span className="text-lg font-black">CS</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide">
                  College Societies
                </span>
                <span className="text-[11px] text-slate-400">
                  Management Console
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 text-xs text-slate-300 shadow-soft transition hover:border-neonCyan/60 hover:text-neonCyan"
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-3xl px-3 py-2 text-sm font-medium transition-all duration-200',
                    'hover:bg-white/10 hover:text-neonCyan',
                    isActive
                      ? 'bg-white/10 text-neonCyan shadow-soft'
                      : 'text-slate-300',
                  ].join(' ')
                }
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/60 text-slate-200 group-hover:bg-slate-800/80">
                  <Icon className="h-4 w-4" />
                </span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>

      <nav className="fixed bottom-3 left-0 right-0 z-40 mx-auto flex max-w-md justify-around rounded-3xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-slate-300 shadow-soft backdrop-blur-xl lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1 transition-all',
                  isActive ? 'text-neonCyan' : 'text-slate-300',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={[
                      'flex h-8 w-8 items-center justify-center rounded-2xl',
                      isActive
                        ? 'bg-gradient-to-tr from-neonCyan/30 to-neonPurple/40 shadow-glow'
                        : 'bg-slate-800/70',
                    ].join(' ')}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[11px]">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

