/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'deposit': "url('/src/assets/long-red-back.png')",
        'redback': "url('/src/assets/red-back.png')",
      }
    }
  },
  plugins: [],
}