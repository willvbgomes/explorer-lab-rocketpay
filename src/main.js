import './css/index.css'

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type) {
  const colors = {
    default: ['black', 'grey'],
    mastercard: ['#df6f29', '#c69347'],
    visa: ['#436d99', '#2d57f2'],
  }

  const [color1, color2] = colors[type]

  ccBgColor01.setAttribute('fill', color1)
  ccBgColor02.setAttribute('fill', color2)
  ccLogo.setAttribute('src', `/cc-${type}.svg`)
}

globalThis.setCardType = setCardType
