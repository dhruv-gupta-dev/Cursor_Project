import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SocietyCard } from '../components/SocietyCard';
import { GlassModal } from '../components/GlassModal';
import { toast } from 'sonner';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { SkeletonCard } from '../components/SkeletonCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Societies = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [isLoading] = useState(false);
  const { societies, joinSociety } = useData();

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-50">
              Societies directory
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Explore all registered societies with live engagement metrics.
            </p>
          </div>
          <button
            className="btn-primary text-xs"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Create society
          </button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {societies.map((society) => (
              <motion.div key={society.id} variants={itemVariants}>
                <SocietyCard
                  {...society}
                  onJoin={async (id) => {
                    const p = joinSociety(id);
                    toast.promise(p, {
                      loading: 'Adding you to the society…',
                      success: 'Joined society. Dashboard metrics updated.',
                      error: 'Unable to join society right now.',
                    });
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <GlassModal
        open={createOpen}
        onClose={() => !busy && setCreateOpen(false)}
        title="Create new society"
        description="Define a new society that students can discover and join."
        primaryActionLabel="Create society"
        busy={busy}
        onPrimaryAction={() => {
          setBusy(true);
          const p = new Promise<void>((resolve) =>
            setTimeout(() => resolve(), 1200),
          );
          p.then(() => {
            setBusy(false);
            setCreateOpen(false);
            toast.success('Society created.', {
              description:
                'The new society will appear in this list once data is persisted.',
            });
          });
        }}
      >
        <div className="grid gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-300">Society name</label>
            <input
              className="w-full rounded-2xl border border-white/15 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-neonCyan/60 focus:outline-none focus:ring-1 focus:ring-neonCyan/60"
              placeholder="e.g. Sustainability & Green Campus"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-300">Category</label>
            <select className="w-full rounded-2xl border border-white/15 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 focus:border-neonCyan/60 focus:outline-none focus:ring-1 focus:ring-neonCyan/60">
              <option>Technical</option>
              <option>Cultural</option>
              <option>Sports</option>
              <option>Social</option>
            </select>
          </div>
        </div>
      </GlassModal>
    </>
  );
};

export default Societies;

