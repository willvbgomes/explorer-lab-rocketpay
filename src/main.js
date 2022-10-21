import './css/index.css'
import IMask from 'imask'

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

const updateCardType = (type) => {
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

globalThis.updateCardType = updateCardType

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
      type: 'mastercard',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      type: 'visa',
    },
    {
      mask: '0000 0000 0000 0000',
      type: 'default',
    },
  ],
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')
    const numberMask = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    )

    return numberMask
  },
}
const cardNumberMask = IMask(cardNumber, cardNumberPattern)

const updateCreditCardNumber = (number) => {
  const ccNumber = document.querySelector('.cc-number')

  return (ccNumber.innerText =
    number.length === 0 ? '1234 5678 9012 3456' : number)
}

cardNumberMask.on('accept', () => {
  const cardType = cardNumberMask.masked.currentMask.type

  updateCardType(cardType)
  updateCreditCardNumber(cardNumberMask.value)
})

const cardHolder = document.querySelector('#card-holder')

const updateCreditCardHolder = () => {
  const ccHolder = document.querySelector('.cc-holder .value')

  return (ccHolder.innerText =
    cardHolder.value.length === 0 ? 'fulano da silva' : cardHolder.value)
}

cardHolder.addEventListener('input', updateCreditCardHolder)

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMask = IMask(expirationDate, expirationDatePattern)

const updateExpirationDate = (date) => {
  const ccExpiration = document.querySelector('.cc-expiration .value')

  return (ccExpiration.innerText = date.length === 0 ? '02/32' : date)
}

expirationDateMask.on('accept', () => {
  updateExpirationDate(expirationDate.value)
})

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: '000',
}
const securityCodeMask = IMask(securityCode, securityCodePattern)

const updateSecurityCode = (code) => {
  const ccSecurity = document.querySelector('.cc-security .value')

  return (ccSecurity.innerText = code.length === 0 ? '123' : code)
}

securityCodeMask.on('accept', () => {
  updateSecurityCode(securityCodeMask.value)
})
