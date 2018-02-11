const sjcl = require('sjcl-all')
const fs = require('fs')
const SymmetricKey = require('./SymmetricKey.js')
const AsymmetricKey = require('./AsymmetricKey.js')
const FileCrypto = require('./FileCrypto.js')

const INPUT_ENCODING = 'utf8'
const OUTPUT_ENCODING = 'hex'

const DEFAULTS = sjcl.json.defaults

module.exports = class Crypto {
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

  _generate () {
    return sjcl.random.randomWords(8) // 256bit key
  }

  decrypt () {

  }

  generateKeyPair () {
    let pair = AsymmetricKey.generate() // Return an AsymmetricKey Class
    return {pub: pair.pub, sec: pair.sec}
  }

  generateKey () {
    const key = this._generate()
    return sjcl.codec.hex.fromBits(key)
  }

  pubEncrypt (pubKey, plaintext) {
    return sjcl.encrypt(AsymmetricKey.deserialize(pubKey, 'pub'), plaintext)
  }

  pubDecrypt (secKey, cipher) {
    return sjcl.decrypt(AsymmetricKey.deserialize(secKey, 'sec'), cipher)
  }

  encryptFile (file) {
    SymmetricKey.generate(16).then(iv => {
      const fileCrypto = new FileCrypto(this.symKey, iv)
      /* The file should be encrypted to chungs of 16 bytes */
      fileCrypto.encryptChunk(Buffer.from('YELLOW_SUBMARINE', INPUT_ENCODING), this.hmacKey)
    })
  }
}
