import { GlassCard } from '../components/GlassCard';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AI = () => {
  return (
    <div className="relative space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">
            AI recommendations
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Let the AI co-pilot optimize societies, events, and engagement.
          </p>
        </div>
      </div>

      <GlassCard className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.18),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.18),_transparent_55%)] opacity-80" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-3">
            <div className="inline-flex items-center gap-1 rounded-2xl border border-neonCyan/40 bg-slate-900/70 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-neonCyan shadow-soft">
              <Sparkles className="h-3 w-3" />
              AI Playbook
            </div>
            <h2 className="text-lg font-semibold text-slate-50">
              Tailored suggestions for your campus ecosystem
            </h2>
            <p className="text-xs text-slate-300">
              Our model analyzes attendance, overlap, and sentiment data to
              automatically surface the next best action for each society and
              event, without adding to your workload.
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-200">
              <li>• Auto-detect under-served interests and propose new societies</li>
              <li>• Flag schedule clashes and recommend optimal time slots</li>
              <li>• Suggest cross-society collaborations that boost engagement</li>
            </ul>
            <button className="btn-primary mt-3 text-xs">
              <Bot className="mr-1.5 h-3.5 w-3.5" />
              Generate recommendations
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-3 flex flex-1 items-center justify-center sm:mt-0">
            <div className="relative h-32 w-32">
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-neonCyan/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-3 rounded-full border border-dashed border-neonPurple/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-6 flex items-center justify-center rounded-full bg-slate-950/80 shadow-soft">
                <Bot className="h-8 w-8 text-neonCyan" />
              </div>
              <motion.div
                className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neonCyan shadow-glow"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      <motion.button
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-neonCyan to-neonPurple text-slate-900 shadow-glow sm:bottom-6 sm:right-6"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="absolute inline-flex h-[150%] w-[150%] animate-pulse-ring rounded-full border border-neonCyan/50" />
        <Bot className="relative h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default AI;

