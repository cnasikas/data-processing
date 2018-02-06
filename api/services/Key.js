/* eslint-disable no-console */
/* Code from: https://github.com/sec51/nodejs-aes-ctr/blob/master/key.js */

import errors from '../errors/errors.js'

export default class Key {
  static generate (keySize) {
    throw errors.crypto.keyGenerateFunc
  }

  /**
   * Returns the key HEX encoded
   * @return {string} HEX encoded string
   */
  toString () {
    console.log('No key!')
  }
}
