const validator = require('validator')

module.exports = (obj) => {
  let esc = { ...obj }
  for (let prop in obj) {
    if (typeof obj[prop] === 'string' || obj[prop] instanceof String) {
      esc[prop] = validator.escape(obj[prop])
    }
  }

  return esc
}
