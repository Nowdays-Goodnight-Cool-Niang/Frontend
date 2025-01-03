/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          white: '#FFFFFF',
          50: '#F4F8FA',
          100: '#CDD9E4',
          200: '#90A2B7',
          300: '#768797',
          400: '#56687A',
          500: '#41505B',
          black: '#1E272E',
        },
      },
    },
  },
  plugins: [],
};
