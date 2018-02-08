/* eslint-disable no-console */
/* Code from: https://github.com/sec51/nodejs-aes-ctr/blob/master/key.js */

import crypto from 'crypto' // Node.js Crypto library
import Key from './Key'
import errors from '../errors/errors.js'

const encoding = 'hex'

const emptyBuffer = Buffer.alloc(256)

const KEY_SIZE = 32

export default class AssymetricKey extends Key {
  constructor (keyBuffer) {
    super()
    // check thay the key size is KEY_SIZE
    if (keyBuffer.length !== 16 && keyBuffer.length !== KEY_SIZE) {
      throw errors.crypto.wrongKeyLength
    }

    // Make sure the key is not empty
    if (emptyBuffer.equals(keyBuffer)) {
      throw errors.crypto.emptyKey
    }

    this.buffer = keyBuffer
  }

  /**
   * Generates a new cryptographically secure random key
   * @return {Promise<Key>} Returns a Key in case of success, an Error otherwise.
   */
  static generate (keySize) {
    return new Promise((resolve, reject) => {
      // read keySize bits of random data
      crypto.randomBytes(keySize, (err, buf) => {
        // reject the promise in case of error

        if (err) {
          reject(err)
          return
        }

        // Debugging in case is needed
        // console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
        // console.log('=========');

        // resolve successfully the promise in case of a valid key
        resolve(new AssymetricKey(buf))
      })
    })
  }

  /**
   * Returns the key HEX encoded
   * @return {string} HEX encoded string
   */
  toString () {
    return this.buffer.toString(encoding)
  }
}