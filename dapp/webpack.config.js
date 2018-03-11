const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
    })
  ]
}
