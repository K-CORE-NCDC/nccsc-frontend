module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
       ...theme('colors'),
       'website-bg': '#f5f8fe',
       'secondary': '#ffed4a',
       'danger': '#e3342f',
       'footer':'#172136',
       'tab':'#edeff3'
     }),
     textColor:theme=>({
       'footer':'#9092a6'
     })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
