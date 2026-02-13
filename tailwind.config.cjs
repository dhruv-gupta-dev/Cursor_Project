/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      colors: {
        neonCyan: '#00f5ff',
        neonPurple: '#a855f7',
        surface: {
          light: '#050816',
          dark: '#020617',
        },
        foreground: '#e5e7eb',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15,23,42,0.4)',
        glow: '0 0 30px rgba(0,245,255,0.4)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top, rgba(0,245,255,0.2), transparent 60%)',
        'gradient-neon':
          'linear-gradient(135deg, rgba(0,245,255,0.25), rgba(168,85,247,0.25))',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'float-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'float-bounce': 'float-bounce 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
