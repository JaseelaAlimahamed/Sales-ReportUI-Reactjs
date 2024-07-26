/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        container: {
          center: true,
          padding: {
            DEFAULT: '4rem',
            sm: '2rem',
            lg: '4rem',
            xl: '5rem',
            '2xl': '6rem',
          },
        },
        extend: {
          screens: {},
            fontFamily: {
              intern: ['Intern', 'sans-serif'],
            },
        },
      },
      plugins: [],
  }