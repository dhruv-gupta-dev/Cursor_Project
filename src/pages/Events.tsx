import { useState } from 'react';
import { Plus } from 'lucide-react';
import { EventCard } from '../components/EventCard';
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

const Events = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [isLoading] = useState(false);
  const { events, registerForEvent } = useData();

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-50">Events</h1>
            <p className="mt-1 text-xs text-slate-400">
              Manage event capacity, RSVP health, and status at a glance.
            </p>
          </div>
          <button
            className="btn-primary text-xs"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add event
          </button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {events.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <EventCard
                  {...event}
                  onRegister={async (id) => {
                    const p = registerForEvent(id);
                    toast.promise(p, {
                      loading: 'Reserving a seat for you…',
                      success: 'Registered for event. Capacity updated.',
                      error: 'Unable to register for event right now.',
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
        title="Create new event"
        description="Add an upcoming event to the shared college calendar."
        primaryActionLabel="Create event"
        busy={busy}
        onPrimaryAction={() => {
          setBusy(true);
          const p = new Promise<void>((resolve) =>
            setTimeout(() => resolve(), 1200),
          );
          p.then(() => {
            setBusy(false);
            setCreateOpen(false);
            toast.success('Event created.', {
              description:
                'The event will appear in this list once it is saved to the backend.',
            });
          });
        }}
      >
        <div className="grid gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-300">Event title</label>
            <input
              className="w-full rounded-2xl border border-white/15 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-neonCyan/60 focus:outline-none focus:ring-1 focus:ring-neonCyan/60"
              placeholder="e.g. Inter-College Coding Marathon"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-300">Host society</label>
            <input
              className="w-full rounded-2xl border border-white/15 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-neonCyan/60 focus:outline-none focus:ring-1 focus:ring-neonCyan/60"
              placeholder="e.g. AI & Machine Learning Society"
            />
          </div>
        </div>
      </GlassModal>
    </>
  );
};

export default Events;

