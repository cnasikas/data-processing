const slugify = require('./slugify.js')
const escapeObject = require('./escapeObject.js')
const isString = require('./isString.js')
const trimNullBytes = require('./trimNullBytes.js')
const { parseProof, normalizeProof, parseVerificationKey } = require('./proof.js')

const util = {
  slugify,
  escapeObject,
  isString,
  trimNullBytes,
  parseProof,
  normalizeProof,
  parseVerificationKey
}

module.exports = util
