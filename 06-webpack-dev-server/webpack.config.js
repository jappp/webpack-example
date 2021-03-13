const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 根据打包过程中所遇到的文件路径匹配是否使用该loader
        use: [
          'style-loader',
          'css-loader',
        ], // 指定具体loader, 多个loader执行顺序由后向前，栈
      },
    ]
  },
  plugins: [
    // 重新打包时清除之前打包目录
    new CleanWebpackPlugin(),
    // 动态生成html文件
    new HtmlWebpackPlugin({
      title: 'Webpack Dev Server',
    }),
    // 拷贝静态资源
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { 
    //       from: path.join(__dirname, '/src/assets'),
    //       to: 'public'
    //     }
    //   ]
    // }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8081,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 替换掉代理地址中的 /api
        },
        changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
      }
    }
  }
}