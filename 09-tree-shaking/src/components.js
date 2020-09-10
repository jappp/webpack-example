export const Button = () => {
  return document.createElement('button')
  // 未引用代码
  console.log('dead-code')
}
// 未引用代码
export const Link = () => {
  return document.createElement('a')
}
// 未引用代码
export const Heading = level => {
  return document.createElement('h' + level)
}