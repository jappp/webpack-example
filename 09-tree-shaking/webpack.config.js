const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
  },

  resolve: {

  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }] // 确保不会转换 ES Modules
            ]
          }
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],

  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 压缩输出结果
    minimize: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 移除副作用代码(模块的副作用指的就是模块执行的时候除了导出成员，是否还做了其他的事情)
    // package.json 可以使用sideeffects控制副作用移除范围
    sideEffects: true,
  }
}