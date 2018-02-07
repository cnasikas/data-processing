/* eslint-disable no-console */
/* Code from: https://github.com/sec51/nodejs-aes-ctr/blob/master/key.js */

export default class Key {
  static generate (keySize) {
    throw new Error('You have to implement your generate key function!')
  }

  /**
   * Returns the key HEX encoded
   * @return {string} HEX encoded string
   */
  toString () {
    return ''
  }
}
