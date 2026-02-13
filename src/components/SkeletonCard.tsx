import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

export const SkeletonCard = () => {
  return (
    <GlassCard className="flex h-full flex-col gap-3 p-4" hover={false}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 rounded-full bg-slate-800/60" />
          <div className="h-4 w-32 rounded-full bg-slate-800/60" />
        </div>
        <div className="h-8 w-8 rounded-2xl bg-slate-800/60" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="h-3 w-24 rounded-full bg-slate-800/60" />
        <div className="h-3 w-16 rounded-full bg-slate-800/60" />
      </div>
      <div className="mt-2 h-2.5 w-full rounded-full bg-slate-800/60" />
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </GlassCard>
  );
};
