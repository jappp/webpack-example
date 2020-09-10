const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  // 生产模式配置
})