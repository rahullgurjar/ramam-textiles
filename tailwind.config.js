/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#FAF7F2',
        main: '#121815',
        sand: {
          light: '#FDFBF8',
          DEFAULT: '#FAF7F2',
          dark: '#F2ECE0',
          stone: '#EADFCF',
        },
        emerald: {
          deep: '#0C1813',
          surface: '#13241C',
          card: '#182E24',
          light: '#254234',
        },
        gold: {
          light: '#DFCA9F',
          DEFAULT: '#C4A674',
          dark: '#9E8150',
          metallic: '#B89758',
        },
        terracotta: {
          DEFAULT: '#8A4A3B',
          soft: '#A35E4E',
        },
        indigo: {
          custom: '#1B3245',
          soft: '#28475E',
        },
      },
      fontFamily: {
        heading: ['Cinzel', 'Georgia', 'serif'],
        editorial: ['Cormorant Garamond', 'Garamond', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
