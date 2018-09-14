/* https://stackoverflow.com/a/22809513/2073994 */

module.exports = (str) => {
  return str.replace(/\0/g, '')
}
