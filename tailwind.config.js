/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Escala cálida: crema (50) → beige/tan → marrón → espresso (900).
        brand: {
          50: '#faf6ef',
          100: '#f3ebdd',
          200: '#e6d7bf',
          300: '#d3bd99',
          400: '#b8996e',
          500: '#9a784f',
          600: '#7d5f3d',
          700: '#5f472c',
          800: '#45331f',
          900: '#2f2216',
        },
        // Acento marrón caramelo para CTAs, títulos destacados y detalles.
        accent: {
          50: '#f9f1e5',
          100: '#f0ddc3',
          200: '#e3c294',
          300: '#d2a463',
          400: '#c1873c',
          500: '#a86f2c',
          600: '#8c5a25',
          700: '#6f471f',
          800: '#573818',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
