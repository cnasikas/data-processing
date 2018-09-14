const slugify = require('./slugify.js')
const escapeObject = require('./escapeObject.js')
const isString = require('./isString.js')
const trimNullBytes = require('./trimNullBytes.js')

const util = {
  slugify,
  escapeObject,
  isString,
  trimNullBytes
}

module.exports = util
