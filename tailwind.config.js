// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      colors: {
        'kramp': {
          100: '#F7E6E6',
        },

      },
      borderColor: (theme) => ({
        ...theme('colors'),
        'b-color': "#ced4da",
        'blue-color': "#0c2f4d"

      }),

      textColor: {
        'main-blue': '#0c2f4d'
      },
      backgroundColor: {
        'main-blue': '#0c2f4d'
      },
      
      fontFamily: {

      },
      fontSize: {
        screen: {
          lg: {
            xs: "10px",
            s: "15px",
            sm: "17px",
            "2sm": "20px",
            m: "50px",
            md: "25px",
          },
        }
        
      }

    },
    screens: {
      'xs': '300px',
      'sm': '640px',
      'md': '860px',
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
