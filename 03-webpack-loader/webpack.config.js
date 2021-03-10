module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
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
      {
        test: /\.md$/,
        use: './markdown-loader'
      }
    ]
  }
}