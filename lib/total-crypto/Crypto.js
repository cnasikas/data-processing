const sjcl = require('sjcl-all')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const SymmetricKey = require('./SymmetricKey.js')
const AsymmetricKey = require('./AsymmetricKey.js')
const FileEncryptStreamer = require('./FileEncryptStreamer.js')
const util = require('data-market-utils')

const INPUT_ENCODING = 'utf8'
const OUTPUT_ENCODING = 'hex'

const CIPHER = 'aes-256-ctr'
const HASH_FUNC = 'sha256'

const DEFAULTS = sjcl.json.defaults

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
    const iv = sjcl.codec[OUTPUT_ENCODING].fromBits(this._generate(4))
    const fileName = path.basename(filePath, path.extname(filePath))
    const absPath = path.dirname(filePath) + '/' + fileName + '.enc'
    const frs = fs.createReadStream(filePath)
    const fws = fs.createWriteStream(absPath)
    // const fes = new FileEncryptStreamer(Buffer.from(key, 'hex'), Buffer.from(hmacKey, 'hex'), Buffer.from(iv, 'hex'))
    const fes = crypto.createCipheriv(CIPHER, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex')) // NOT SECURE!!
    frs.pipe(fes).pipe(fws)

    return new Promise((resolve, reject) => {
      frs.on('error', reject)
      fes.on('error', reject)
      fws.on('error', reject)

      fws.on('finish', async (response) => {
        resolve({iv, fileName, absPath})
      })
    })
  }

  decryptFile (key, hmacKey, filePath, iv) {
    const fileName = path.basename(filePath, path.extname(filePath))
    const absPath = path.dirname(filePath) + '/' + fileName + '.dec'
    const frs = fs.createReadStream(filePath)
    const fws = fs.createWriteStream(absPath)
    const fes = crypto.createDecipheriv(CIPHER, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex')) // NOT SECURE!!
    frs.pipe(fes).pipe(fws)

    return new Promise((resolve, reject) => {
      frs.on('error', reject)
      fes.on('error', reject)
      fws.on('error', reject)

      fws.on('finish', async (response) => {
        resolve({iv, absPath})
      })
    })
  }

  hashFile (filePath) {
    // hash a file with nodejs crypto lib

    return new Promise((resolve, reject) => {
      const frs = fs.createReadStream(filePath)
      const hash = crypto.createHash(HASH_FUNC)
      const chunks = []

      hash.on('data', (chunk) => {
        chunks.push(chunk)
      })

      // Send the buffer or you can put it into a var
      hash.on('end', () => {
        resolve(Buffer.concat(chunks).toString('hex'))
        // res.send(Buffer.concat(chunks))
      })

      hash.on('error', (err) => {
        reject(err)
      })

      frs.pipe(hash)
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
