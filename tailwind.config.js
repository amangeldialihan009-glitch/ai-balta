/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald-dark': '#0f172a', // Midnight Blue
        'emerald-green': '#2dd4bf', // Teal
        'neon-cyan': '#22d3ee', // Cyan
        'aurora-purple': '#a78bfa', // Soft Violet
        'aurora-slate': '#1e1b4b', // Deep Slate
        'amber': {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

