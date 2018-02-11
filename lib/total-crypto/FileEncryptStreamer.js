const { Transform } = require('stream')
const FileCrypto = require('./FileCrypto')

module.exports = class FileEncryptStreamer extends Transform {
  constructor (key, hmacKey, nonce) {
    super()
    this.key = key
    this.nonce = nonce
    this.hmacKey = hmacKey
    this.file = new FileCrypto(this.key, this.nonce)
  }

  _transform (chunk, encoding, callback = () => {}) {
    this.file.encryptChunk(chunk, this.hmacKey)
    .then((enc) => {
      this.push(enc.cipherText)
    })
    .catch((err) => {
      callback(err)
    })
    callback()
  }
}
