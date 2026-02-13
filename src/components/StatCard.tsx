import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: number;
}

export const StatCard = ({
  label,
  value,
  suffix,
  icon,
  trend = 'up',
  trendValue,
}: StatCardProps) => {
  const animatedValue = useCountUp(value);

  return (
    <GlassCard className="group relative flex flex-col gap-3 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>
          <div className="mt-1 flex items-end gap-1.5">
            <motion.span
              key={value}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl font-semibold text-slate-50"
            >
              {animatedValue.toLocaleString()}
              {suffix}
            </motion.span>
          </div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/70 text-neonCyan shadow-soft">
          {icon}
        </div>
      </div>

      {typeof trendValue === 'number' && (
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <span
            className={
              trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
            }
          >
            {trend === 'up' ? '▲' : '▼'} {trendValue}%
          </span>
          <span className="text-slate-400">vs last month</span>
        </div>
      )}
    </GlassCard>
  );
};

