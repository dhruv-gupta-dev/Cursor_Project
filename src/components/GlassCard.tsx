import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  const base =
    'glass-card relative overflow-hidden bg-slate-900/40 dark:bg-black/30 border-white/15';

  if (!hover) {
    return <div className={cn(base, className)}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn(base, className)}
    >
      <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-neonCyan/10 via-transparent to-neonPurple/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
};

