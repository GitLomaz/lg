/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#282c34',
        'container-bg': '#2f323a',
        'button-bg': '#35373c',
        border: '#6e9fd1',
      },
    },
  },
  plugins: [],
}
