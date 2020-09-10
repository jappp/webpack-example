const path = require('path');
// const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// src/pages 目录为页面入口的根目录
// const pagesRoot = path.resolve(__dirname, './src/pages');
// fs 读取 pages 下的所有文件夹来作为入口，使用 entries 对象记录下来
// const entries = fs.readdirSync(pagesRoot).reduce((entries, page) => {
//   // 文件夹名称作为入口名称，值为对应的路径，可以省略 `index.js`，webpack 默认会寻找目录下的 index.js 文件
//   entries[page] = path.resolve(pagesRoot, page);
//   return entries;
// }, {});

module.exports = {
  mode: 'development', // 指定构建模式
  devtool: 'cheap-module-eval-source-map',

  // 将 entries 对象作为入口配置
  entry: './src/index.js',

  output: {
    // 文件名中可以使用 hash，可以用于避免发布新版本时浏览器缓存导致代码没有更新
    filename: '[name].js', // 使用 [name] 来引用 entry 名称
    path: path.join(__dirname, '/dist'),
  },

  devServer: {
    hot: true,
    // 配置提供额外静态文件内容的目录
    contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")],
    proxy: {
      '/api': {
        target: "http://localhost:3000", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // 把 URL 中 path 部分的 `api` 移除掉
      },
    }
  },

  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages'),
      style: path.resolve(__dirname, 'src/style'),
    },
    extensions: ['.js', '.jsx'], // 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
    modules: [
      path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
      'node_modules', // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
    ],
  },

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ // 返回 postcss 的插件列表
                require('cssnano')(), // 使用 cssnano
              ],
            },
          },
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
            }
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
    // DefinePlugin可用于创建一些在编译时可以配置值，在运行时可以使用的常量
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
      BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
      CONSTANTS: {
        APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
      }
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html', // 配置文件模板
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        collapseInlineTagWhitespace: true, 
        collapseWhitespace: true, // 和上一个配置配合，移除无用的空格和换行
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' // 这里也可以使用 [hash]
    }), // 将 css 文件单独抽离的 plugin
    new CleanWebpackPlugin(),
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin()
  ],

  // TerserPlugin 的使用比较特别，需要配置在 optimization 字段中，属于构建代码优化的一部分
  optimization: {
    // useExports: true, // 模块内未使用的部分不进行导出
    concatenateModules: true, // 整合可以优化的模块
    minimize: true, // 启用代码压缩
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i, // 只处理 .js 文件
      cache: true, // 启用缓存，可以加速压缩处理
    })], // 配置代码压缩工具
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      name: 'common', // 给分离出来的 chunk 起个名字
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(__dirname, "node_modules"), // 路径在 node_modules 目录下的都作为公共部分
          name: "vendor", // 使用 vendor 入口作为公共部分
          enforce: true,
        },
      },
    },
  },
}