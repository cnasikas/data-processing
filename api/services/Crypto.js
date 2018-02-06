import crypto from 'crypto' // Node.js Crypto library
import fs from 'fs'
import _ from 'lodash'
import Key from './Key.js'
import FileCrypto from './FileCrypto.js'
import errors from '../errors/errors.js'

const INPUT_ENCODING = 'utf8'
const OUTPUT_ENCODING = 'hex'

export default class Crypto {
  constructor (symKey, hmacKey) {
    this.symKey = symKey
    this.hmacKey = hmacKey

    if (_.isEmpty(this.symKey) || _.isEmpty(this.hmacKey)) {
      throw errors.crypto.wrongKeyLength
    }

    if (this.symKey === this.hmacKey) {
      throw errors.crypto.diffKeys
    }
  }

  _genKey (keySize) {
    /* Returns a promise */
    return Key.generate(keySize)
  }

  _readFile (filename, encoding = null) {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(filename, encoding, (err, buffer) => {
          if (err) {
            reject(err)
          } else {
            resolve(buffer)
          }
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  encrypt () {
    return new Promise((resolve, reject) => {
      this._genKey(16).then((iv) => {

      })
    })
  }

  decrypt () {

  }

  encryptKey () {
    return new Promise((resolve, reject) => {
      this._readFile('../keys/public.pem', 'utf8')
      .then((pubKey) => {
        // we encrypt the symmetric key with the public key of the processor
        let encBuffer = crypto.publicEncrypt(pubKey, Buffer.from(this.symKey, 'hex'))
        resolve(encBuffer.toString('base64'))
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  }

  encryptFile (file) {
    Key.generate(16).then(iv => {
      const fileCrypto = new FileCrypto(this.symKey, iv)
      /* The file should be encrypted to chungs of 16 bytes */
      fileCrypto.encryptChunk(Buffer.from('YELLOW_SUBMARINE', INPUT_ENCODING), this.hmacKey)
    })
  }
}
