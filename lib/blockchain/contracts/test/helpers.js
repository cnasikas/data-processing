const trimNullBytes = (str) => {
  return str.replace(/\0/g, '')
}

module.exports = {
  trimNullBytes
}
