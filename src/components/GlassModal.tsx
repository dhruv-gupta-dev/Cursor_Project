import { ReactNode, MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

interface GlassModalProps {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onClose: () => void;
  busy?: boolean;
}

export const GlassModal = ({
  open,
  title,
  description,
  children,
  primaryActionLabel,
  onPrimaryAction,
  onClose,
  busy = false,
}: GlassModalProps) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !busy) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative w-full max-w-md border-white/20 bg-slate-900/80 p-5 shadow-soft"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-slate-300 shadow-soft transition hover:border-neonCyan/60 hover:text-neonCyan disabled:opacity-60"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 space-y-1 pr-8">
              <h2 className="text-sm font-semibold text-slate-50">{title}</h2>
              {description && (
                <p className="text-xs text-slate-400">{description}</p>
              )}
            </div>

            {children && <div className="space-y-3">{children}</div>}

            {primaryActionLabel && (
              <div className="mt-5 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={busy}
                  className="inline-flex items-center justify-center rounded-3xl border border-white/15 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200 shadow-soft transition hover:border-slate-400/60 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  disabled={busy}
                  className={cn(
                    'btn-primary px-4 py-1.5 text-xs',
                    busy && 'cursor-wait opacity-80',
                  )}
                >
                  {busy ? 'Saving...' : primaryActionLabel}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

