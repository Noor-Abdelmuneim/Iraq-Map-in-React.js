/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: "./src/**/*.{js,jsx,ts,tsx}",
  theme: {
    extend: {
      transitionProperty: {
        'fill-opacity': 'fill, opacity',
      },
      transitionDuration: {
        'fill-opacity': '800ms, 1000ms',
      },
      transitionTimingFunction: {
        'fill-opacity': 'ease, ease',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

