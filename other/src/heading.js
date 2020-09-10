export default () => {
  const element = document.createElement('h2')
  element.textContent = 'Hello webpa2k1'
  element.addEventListener('click', () => alert('Hello webpack'))
  return element
}