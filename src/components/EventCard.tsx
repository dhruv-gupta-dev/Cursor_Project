import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';
import { CalendarDays, Users, TicketPlus } from 'lucide-react';
import type { EventStatus } from '../context/DataContext';

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  capacity: number;
  registered: number;
  status: EventStatus;
  society: string;
  onRegister?: (id: string) => void;
}

export const EventCard = ({
  id,
  name,
  date,
  capacity,
  registered,
  status,
  society,
  onRegister,
}: EventCardProps) => {
  const fill = Math.min(100, Math.round((registered / capacity) * 100));
  const isLive = status === 'Live';

  const statusColor =
    status === 'Live'
      ? 'bg-emerald-500/90 text-emerald-50'
      : status === 'Upcoming'
      ? 'bg-neonCyan/80 text-slate-900'
      : 'bg-slate-600/80 text-slate-50';

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: '0 0 30px rgba(0,245,255,0.35)',
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="rounded-3xl"
    >
      <GlassCard className="relative flex flex-col gap-3 overflow-hidden border border-white/20 bg-slate-900/60 p-4">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neonCyan/10 via-transparent to-neonPurple/15 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              {society}
            </p>
            <h3 className="mt-1 text-sm font-semibold text-slate-50">{name}</h3>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className={`inline-flex items-center gap-1 rounded-2xl px-2 py-0.5 text-[10px] font-semibold ${statusColor}`}
            >
              {status === 'Live' && (
                <span className="relative mr-0.5 inline-flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400/70" />
                  <span className="relative h-1 w-1 rounded-full bg-emerald-50" />
                </span>
              )}
              {status}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <CalendarDays className="h-3 w-3" />
              <span>{date}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-neonCyan" />
              <span>
                {registered} / {capacity} registered
              </span>
            </div>
            <span className="text-[11px] text-slate-400">{fill}% full</span>
          </div>

          <div className="h-2.5 rounded-full bg-slate-800/80">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fill}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`h-full rounded-full bg-gradient-to-r from-neonCyan to-neonPurple ${isLive ? 'shadow-glow' : ''}`}
            />
          </div>
          {onRegister && status !== 'Completed' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRegister(id);
              }}
              className="mt-2 inline-flex items-center justify-center rounded-3xl border border-neonCyan/50 bg-slate-900/70 px-3 py-1.5 text-[11px] font-medium text-neonCyan shadow-soft transition hover:border-neonCyan hover:bg-slate-900/90"
            >
              <TicketPlus className="mr-1.5 h-3 w-3" />
              Register
            </button>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

