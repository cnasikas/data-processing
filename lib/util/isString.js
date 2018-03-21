module.exports = (input) => {
  // https://github.com/chriso/validator.js/blob/master/src/lib/util/assertString.js
  return (typeof input === 'string' || input instanceof String)
}
