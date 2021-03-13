const HtmlWebpackPlugin =  require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  // ...
  entry: './src/main.js',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin()
  ]
}