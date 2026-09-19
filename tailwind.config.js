/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFA',
          100: '#FAF6EE',
          200: '#F5EEDC',
          300: '#EBDDC0',
          400: '#DFCAA0',
        },
        strawberry: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#E5202C',
          600: '#D31420',
          700: '#B50E19',
          800: '#940B14',
          900: '#750B12',
        },
        leaf: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#2C8B33',
          600: '#23732A',
          700: '#1B5B20',
          800: '#144618',
          900: '#0E3311',
        },
        menuyellow: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
        },
        earth: {
          50: '#FAF6EE',
          100: '#F5EFEA',
          200: '#E8DDD5',
          300: '#D5C4B7',
          400: '#B89F8E',
          500: '#8C705E',
          600: '#695142',
          700: '#4A3426',
          800: '#2E1E14',
          900: '#1C120B',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Poppins', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'natural': '0 4px 20px -2px rgba(46, 30, 20, 0.06), 0 2px 6px -1px rgba(46, 30, 20, 0.04)',
        'natural-hover': '0 10px 25px -4px rgba(229, 32, 44, 0.12), 0 4px 10px -2px rgba(46, 30, 20, 0.06)',
        'menu-board': '0 8px 30px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
