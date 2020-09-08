import createHeading from './heading.js'
import './style.css'


const heading = createHeading()
document.body.append(heading)
document.body.append(document.createElement('input'))