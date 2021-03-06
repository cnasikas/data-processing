const sjcl = require('sjcl-all')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const AsymmetricKey = require('./AsymmetricKey.js')
const FileEncryptStreamer = require('./FileEncryptStreamer.js')
const util = require('data-market-utils')

const OUTPUT_ENCODING = 'hex'

const CIPHER = 'aes-256-cbc-hmac-sha256'
const HASH_FUNC = 'sha256'

module.exports = class Crypto {
  constructor () {
    // eslint-disable-next-line
    this.hashFunction = new sjcl.hash[HASH_FUNC]()
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
    return { pub: pair.pub, sec: pair.sec }
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

  encryptFile (key, src, dest = '') {
    const iv = sjcl.codec[OUTPUT_ENCODING].fromBits(this._generate(4))
    const frs = fs.createReadStream(src)
    const fws = fs.createWriteStream(dest)
    const fileName = path.basename(src)

    const fes = crypto.createCipheriv(CIPHER, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
    frs.pipe(fes).pipe(fws)

    return new Promise((resolve, reject) => {
      frs.on('error', reject)
      fes.on('error', reject)
      fws.on('error', reject)

      fws.on('finish', (response) => {
        resolve({ iv, fileName, dest })
      })
    })
  }

  decryptFile (key, src, dest, iv) {
    const frs = fs.createReadStream(src)
    const fws = fs.createWriteStream(dest)
    const fileName = path.basename(src)
    const fes = crypto.createDecipheriv(CIPHER, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex')) // NOT SECURE!!
    frs.pipe(fes).pipe(fws)

    return new Promise((resolve, reject) => {
      frs.on('error', reject)
      fes.on('error', reject)
      fws.on('error', reject)

      fws.on('finish', (response) => {
        resolve({ iv, fileName, dest })
      })
    })
  }

  hashFile (filePath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash(HASH_FUNC)
      const rs = fs.createReadStream(filePath)
      rs.on('error', reject)
      rs.on('data', chunk => hash.update(chunk))
      rs.on('end', () => resolve(hash.digest('hex')))
    })
  }

  bytesToHex (byteArray) {
    return sjcl.codec[OUTPUT_ENCODING].fromBits(byteArray)
  }

  hextoBytes (hex) {
    return sjcl.codec[OUTPUT_ENCODING].toBits(hex)
  }

  hash (data) {
    // hash with sjcl
    this.hashFunction.reset()

    if (util.isString(data)) {
      data = [data]
    }

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
