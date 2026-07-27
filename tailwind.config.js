/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Escala fría: blanco (50) → gris claro → gris → casi negro (900).
        brand: {
          50: '#f8fafc',
          100: '#eef1f5',
          200: '#dde3ea',
          300: '#c5ced8',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Acento azul oscuro para CTAs, títulos destacados y detalles.
        accent: {
          50: '#eef3f9',
          100: '#d5e2f0',
          200: '#abc6e1',
          300: '#7aa3cb',
          400: '#4a7fb0',
          500: '#1e4d8c',
          600: '#163a6b',
          700: '#122f56',
          800: '#0d2342',
        },
        // Verde marca de WhatsApp.
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
