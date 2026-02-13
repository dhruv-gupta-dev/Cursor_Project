import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunMedium, MoonStar } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-[4.25rem] items-center rounded-3xl border border-white/20 bg-white/10 px-1 shadow-soft backdrop-blur-xl transition-colors duration-300 hover:border-neonCyan/60 hover:bg-white/15 dark:bg-black/30"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-y-1 w-8 rounded-3xl bg-gradient-to-r from-neonCyan/80 to-neonPurple/80 shadow-glow"
        layout
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        animate={{ x: isDark ? 26 : 0 }}
      />
      <div className="relative z-10 flex w-full items-center justify-between px-1">
        <AnimatePresence initial={false} mode="wait">
          {!isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, y: -4, opacity: 0 }}
              animate={{ rotate: 0, y: 0, opacity: 1 }}
              exit={{ rotate: 90, y: 4, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-6 w-6 items-center justify-center text-yellow-300"
            >
              <SunMedium className="h-4 w-4" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-6 w-6 items-center justify-center text-sky-200"
            >
              <MoonStar className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};

