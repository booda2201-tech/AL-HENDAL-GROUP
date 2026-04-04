/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'gold-primary': '#D4AF37',
        'holding-gold': '#D4AF37',
        'dark-bg': '#0A0A0A',
        'dark-card': '#16161681',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
