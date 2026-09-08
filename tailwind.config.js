/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#060911',
          900: '#0b0f19',
          850: '#111726',
          800: '#1e293b'
        },
        cyan: {
          400: '#38bdf8',
          500: '#06b6d4',
          600: '#0891b2'
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
