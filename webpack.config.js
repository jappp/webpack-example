const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // 指定构建模式

  entry: './src/index.js', // 指定构建入口文件

  output: {
    // 路径中使用 hash，每次构建时会有一个不同 hash 值，可以用于避免发布新版本时浏览器缓存导致代码没有更新
    // 文件名中也可以使用 hash
    path: path.join(__dirname, '/dist/[hash]'),
    filename: '[name].js', // 使用 [name] 来引用 entry 名称
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  },

  module: {
    rules: [
      {
        test: /\.css/i,
        include: [path.resolve(__dirname, 'src')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.jsx?/, // 支持 js 和 jsx 文件，使用 react 时需要
        include: [
          path.resolve(__dirname, 'src'), // 指定哪些路径下的文件需要经过 loader 处理
        ],
        use: {
          loader: 'babel-loader', // 指定使用的 loader
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // 配置文件模板
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' // 这里也可以使用 [hash]
    }), // 将 css 文件单独抽离的 plugin
  ],
}