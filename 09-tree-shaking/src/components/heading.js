console.log('Heading component~') // 副作用代码

export default (level) => {
  return document.createElement('h' + level)
}