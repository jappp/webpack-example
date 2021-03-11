const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const removeCommentsPlugin = require('./remove-comments-plugin')
const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      template: './src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.join(__dirname, '/src/assets'),
          to: 'public'
        }
      ]
    }),
    new removeCommentsPlugin()
  ]
}