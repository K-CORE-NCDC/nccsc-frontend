// // craco.config.js
// module.exports = {
//   style: {
//     postcss: {
//       plugins: [
//         require('tailwindcss'),
//         require('autoprefixer'),
//       ],
//     },
//   },
// }
// craco.config.js

module.exports = {
  style: {
    postcss: {
      plugins: {
        add: [
          new webpack.DefinePlugin({
            process: {env: {}}
          })
        ]
      }
    },
  },
}
