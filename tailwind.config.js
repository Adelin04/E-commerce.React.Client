/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xsm': '350px',
      // => @media (min-width: 350px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        baseColor: '#d6bbd3',
        sliderColor: '#a58aa2d4',
        buttonColor: '#a58aa2d4',
        backgroundCard: '#5a335612',
        border: 'salmon',
        error: '#dd7130',
        textDescriptionAndPrice: '#5f4d5d',
        textBlack: 'rgb(21, 19, 19)',
        textWhite: 'white'
      }
    },
  },
  plugins: [],
}