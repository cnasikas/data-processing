const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: [
    './server.js'
  ],
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'api.js'
  },
  resolve: { symlinks: false },
  plugins: [
    new CopyWebpackPlugin([
      { from: '.env', to: path.resolve(__dirname, 'build') },
      { from: 'package.json', to: path.resolve(__dirname, 'build') },
      { from: '.sequelizerc', to: path.resolve(__dirname, 'build') },
      { from: 'uploads/*', to: path.resolve(__dirname, 'build') }
    ]),
    new CleanWebpackPlugin(['dist', 'build'])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|config)/,
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
