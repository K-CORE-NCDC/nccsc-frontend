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
        'b-color':"#ced4da",
        'blue-color':"#0c2f4d"

      }),

      textColor:{
        'main-blue':'#0c2f4d'
      },
      backgroundColor:{
        'main-blue':'#0c2f4d'
      },
      fontSize: {
        'xs':'12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '22px',
    },
      fontFamily:{

      },
      
    },
    screens:{
      'xs':'300px',
      'sm': '640px',
      'md':'860px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',

    },
    

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
