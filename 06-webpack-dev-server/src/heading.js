export default () => {
  const element = document.createElement('h2')
  element.textContent = 'Hello webpack1'
  element.addEventListener('click', () => alert('Hello webpack'))
  return element
}