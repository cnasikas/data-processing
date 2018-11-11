const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: [
    '@babel/polyfill',
    './util.js'
  ],
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'util.js',
    libraryTarget: 'commonjs2'
  },
  resolve: { symlinks: false },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
