/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f38220',
          dark: '#d96c0a',
        },
        accent: '#f4ede7',
        bg: '#fcfaf8',
        text: '#1c140d',
        muted: '#9c7049',
        success: '#07880e',
        danger: '#e71008',
        warning: '#f38524',
      },
    },
  },
  plugins: [],
} 