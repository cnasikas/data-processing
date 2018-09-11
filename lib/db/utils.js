/* https://stackoverflow.com/a/22809513/2073994 */
const trimNullBytes = (str) => {
  return str.replace(/\0/g, '')
}

module.exports = {
  trimNullBytes
}
