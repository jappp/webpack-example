const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  // 开发模式配置
})