const marked = require('marked')

module.exports = source => {
  // 1. 将 markdown 转换为 html 字符串
  const html = marked(source);
  // loader管道处理中最后返回的要是JavaScript代码，这是因为loader返回的结果要拼接到JS模块中。
  // 也可以返回html，在后面调用html-loader来处理html
  const code = `export default ${JSON.stringify(html)}`;
  return code;
}