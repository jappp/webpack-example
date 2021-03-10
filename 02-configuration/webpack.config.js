/**
 * webpack.config.js是运行在node.js环境下的
 * 所以可以直接在该文件下使用path之类的Node.js内置模块，或者第三方npm包
*/
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  }
}

// CommonJs规范导出模块
module.exports = config;