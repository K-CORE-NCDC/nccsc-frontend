// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'kramp':{
          100: '#F7E6E6',
        },

      },
      borderColor: (theme) => ({
        ...theme('colors'),
        'b-color':"#ced4da"
      }),
      textColor:{
        'main-blue':'#0c2f4d'
      },
      backgroundColor:{
        'main-blue':'#0c2f4d'
      },
      fontFamily:{

      },
      screens: {
      'xs': '475px',
        // ...defaultTheme.screens,
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
