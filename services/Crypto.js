import crypto from 'crypto' // Node.js Crypto library
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
      throw errors.cryptoErrors.wrongKeyLength
    }

    if (this.symKey === this.hmacKey) {
      throw errors.cryptoErrors.diffKeys
    }
  }

  _genKey (keySize) {
    /* Returns a promise */
    return Key.generate(keySize)
  }

  encrypt () {
    return new Promise((resolve, reject) => {
      this._genKey(16).then((iv) => {

      })
    })
  }

  decrypt () {

  }

  encryptKeys () {
    return new Promise((resolve, reject) => {

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
