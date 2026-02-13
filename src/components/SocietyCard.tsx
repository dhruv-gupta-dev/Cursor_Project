import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Users2, Star, MapPin } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface SocietyCardProps {
  name: string;
  category: string;
  members: number;
  rating: number;
  location: string;
}

export const SocietyCard = ({
  name,
  category,
  members,
  rating,
  location,
}: SocietyCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    x.set(dx);
    y.set(dy);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 900 }}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <GlassCard className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {category}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                {name}
              </h3>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-neonCyan/50 to-neonPurple/50 text-[11px] font-semibold text-slate-900 shadow-glow">
              {name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 3)
                .toUpperCase()}
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users2 className="h-3.5 w-3.5 text-neonCyan" />
              <span>{members.toLocaleString()} members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-amber-300" />
              <span>{rating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

