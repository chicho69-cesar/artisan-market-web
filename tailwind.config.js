/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tahiti': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        gray: '#25292E',
        blue: '#0077E6',
        green: '#10B981',
        purple: '#7E22CE',
        red: '#F43F5E',
        yellow: '#FACC15',
        lightGray: '#9CA3AF',
        semiWhite: '#F1F1F1'
      }
    },
  },
  plugins: [],
}
