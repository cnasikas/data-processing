const sjcl = require('sjcl-all')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const SymmetricKey = require('./SymmetricKey.js')
const AsymmetricKey = require('./AsymmetricKey.js')
const FileEncryptStreamer = require('./FileEncryptStreamer.js')

const INPUT_ENCODING = 'utf8'
const OUTPUT_ENCODING = 'hex'

const CIPHER = 'aes-256-ctr'

const DEFAULTS = sjcl.json.defaults

module.exports = class Crypto {
  constructor () {
    // eslint-disable-next-line
    this.hashFunction = new sjcl.hash.sha256()
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

  _generate (wordSize) {
    return sjcl.random.randomWords(wordSize) // 256bit key
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
    const frs = fs.createReadStream(filePath)
    const fws = fs.createWriteStream(path.dirname(filePath) + '/' + fileName + '.enc')
    // const fes = new FileEncryptStreamer(Buffer.from(key, 'hex'), Buffer.from(hmacKey, 'hex'), Buffer.from(iv, 'hex'))
    const fes = crypto.createCipheriv(CIPHER, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex')) // NOT SECURE!!
    frs.pipe(fes).pipe(fws)
  }

  decryptFile (key, hmacKey, filePath, iv) {
    let fileName = path.basename(filePath, path.extname(filePath))
    const frs = fs.createReadStream(filePath)
    const fws = fs.createWriteStream(path.dirname(filePath) + '/' + fileName + '.dec')
    const fes = crypto.createDecipheriv(CIPHER, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex')) // NOT SECURE!!
    frs.pipe(fes).pipe(fws)
  }

  hash (data) {
    this.hashFunction.reset()

    for (let d of data) {
      this.hashFunction.update(d)
    }

    let out = this.hashFunction.finalize()
    this.hashFunction.reset()

    return this.bytesToHex(out)
  }

  getEncryptStreamer () {
    return new FileEncryptStreamer()
  }
}
