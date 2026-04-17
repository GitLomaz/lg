/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f4f4',
          100: '#e8e9ea',
          200: '#c5c7ca',
          300: '#a2a5aa',
          400: '#888a8f',
          500: '#6e9fd1',
          600: '#5a8ab8',
          700: '#4a7199',
          800: '#484e59',
          850: '#35373c',
          875: '#31353d',
          900: '#2f323a',
          950: '#282c34',
        },
        accent: {
          blue: '#6e9fd1',
          'blue-dark': '#5a8ab8',
        },
      },
    },
  },
  plugins: [],
}
