const slugify = require('./slugify.js')
const escapeObject = require('./escapeObject.js')
const isString = require('./isString.js')
const trimNullBytes = require('./trimNullBytes.js')
const { parseProof, normalizeProof } = require('./proof.js')

const util = {
  slugify,
  escapeObject,
  isString,
  trimNullBytes,
  parseProof,
  normalizeProof
}

module.exports = util
