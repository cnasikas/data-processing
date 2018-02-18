const sjcl = require('sjcl-all')
const fs = require('fs')
const path = require('path');
const SymmetricKey = require('./SymmetricKey.js')
const AsymmetricKey = require('./AsymmetricKey.js')
const FileEncryptStreamer = require('./FileEncryptStreamer.js')

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

  _generate (wordSize) {
    return sjcl.random.randomWords(wordSize) // 256bit key
  }

  decrypt () {

  }

  generateKeyPair () {
    let pair = AsymmetricKey.generate() // Return an AsymmetricKey Class
    return {pub: pair.pub, sec: pair.sec}
  }

  generateKey () {
    const key = this._generate(8) // 256 bit
    return sjcl.codec[OUTPUT_ENCODING].fromBits(key)
  }

  pubEncrypt (pubKey, plaintext) {
    return sjcl.encrypt(AsymmetricKey.deserialize(pubKey, 'pub'), plaintext)
  }

  pubDecrypt (secKey, cipher) {
    return sjcl.decrypt(AsymmetricKey.deserialize(secKey, 'sec'), cipher)
  }

  encryptFile (key, hmacKey, filePath) {
    let iv = sjcl.codec[OUTPUT_ENCODING].fromBits(this._generate(4))
    let fileName = path.basename(filePath, path.extname(filePath))
    const frs = fs.createReadStream(filePath, {highWaterMark: 16})
    const fws = fs.createWriteStream(path.dirname(filePath) + '/' + fileName + '.enc')
    const fes = new FileEncryptStreamer(Buffer.from(key, 'hex'), Buffer.from(hmacKey, 'hex'), Buffer.from(iv, 'hex'))
    frs.pipe(fes).pipe(fws)
  }

  getEncryptStreamer () {
    return new FileEncryptStreamer()
  }
}