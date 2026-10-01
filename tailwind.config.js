/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#FAF6EE',
        main: '#221516',
        jaipur: {
          rose: {
            50: '#FFF5F5',
            100: '#FDE8E8',
            200: '#FACACA',
            300: '#F49D9B',
            400: '#E86F6B',
            500: '#D14945',
            600: '#B8322E',
            700: '#942220',
            800: '#751B19',
            900: '#4D0E0D',
          },
          terracotta: {
            light: '#E27D60',
            DEFAULT: '#C35138',
            dark: '#8C311E',
          },
          gold: {
            50: '#FDFCF7',
            100: '#FAF3DC',
            200: '#F5E6B5',
            300: '#EED485',
            400: '#E5C058',
            500: '#D4AF37',
            600: '#B89426',
            700: '#937319',
            800: '#6E540F',
            900: '#473507',
          },
          indigo: {
            light: '#2E5B88',
            DEFAULT: '#1B3B6F',
            dark: '#0F2438',
            deep: '#0A1828',
          },
          emerald: {
            light: '#2E6B52',
            DEFAULT: '#1A4A38',
            dark: '#0E2F23',
            deep: '#081C15',
          },
          sand: {
            50: '#FDFBF7',
            100: '#FAF6EE',
            200: '#F3EADB',
            300: '#E9DAC2',
            400: '#DAC5A4',
            500: '#C8AE85',
          },
        },
        sand: {
          light: '#FDFBF7',
          DEFAULT: '#FAF6EE',
          dark: '#F3EADB',
          stone: '#E8DCB8',
        },
        emerald: {
          deep: '#0E2F23',
          surface: '#133C2E',
          card: '#1A4A38',
          light: '#2E6B52',
        },
        gold: {
          light: '#F5E6B5',
          DEFAULT: '#D4AF37',
          dark: '#B89426',
          metallic: '#C59B27',
        },
        terracotta: {
          DEFAULT: '#C35138',
          soft: '#E27D60',
          dark: '#8C311E',
        },
        indigo: {
          custom: '#1B3B6F',
          soft: '#2E5B88',
          dark: '#0F2438',
        },
      },
      fontFamily: {
        royal: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        heading: ['Cinzel', 'Marcellus', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Marcellus', 'serif'],
        marcellus: ['Marcellus', 'serif'],
        rozha: ['"Rozha One"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(116, 29, 40, 0.25)',
        'royal-lg': '0 20px 40px -15px rgba(116, 29, 40, 0.35)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'palace': '0 15px 35px -5px rgba(15, 36, 56, 0.15)',
      },
      backgroundImage: {
        'jaipur-gradient': 'linear-gradient(135deg, #751B19 0%, #4D0E0D 100%)',
        'royal-gold-gradient': 'linear-gradient(135deg, #F5E6B5 0%, #D4AF37 50%, #B89426 100%)',
        'palace-emerald-gradient': 'linear-gradient(135deg, #133C2E 0%, #081C15 100%)',
      },
    },
  },
  plugins: [],
};
