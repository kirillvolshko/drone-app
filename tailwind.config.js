/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plusBlue: {
          DEFAULT: '#1E2841',
          100: '#F0F6F9',
          200: '#BED3DC'
        }
      }
    }
  },
  plugins: []
};
