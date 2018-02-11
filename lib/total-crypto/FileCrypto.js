/* eslint-disable no-console */

/** @module FileCrypto */
/* https://github.com/sec51/nodejs-aes-ctr/blob/master/file_crypto.js */

const crypto = require('crypto')

// The algorithm to use.
const algorithm = 'aes-256-ctr'

// HMAC hasing function
const macFunction = 'sha512'

// The maximum amount of blocks before we need to rotate the key
const MAX_BLOCKS = 2147483647 // 2147483648 * 16bytes = ~32GB

// The nonce buffer offset where to write the counter
const BUFFER_OFFSET = 12

// The nonce buffer size
const BUFFER_SIZE = 16

class FileCrypto {
  /**
   * Initialise the FileCrypto instance with the key used for encrypting a specific file.
   * This initialises an internal counter to make sure the use does not encrypt a block with the same key and nonce.
   * @param {Key} key The encryption key to use.
   * @param {Buffer} nonce A random buffer to use for the nonce.
   */
  constructor (key, nonce) {
    // store the encryption key
    this.key = key

    // create the counter to track how many blocks are encrypted
    this.counter = 0

    // create an encryption and decryption buffer for handling the nonce
    this.encryptionNonce = Buffer.allocUnsafe(BUFFER_SIZE)
    this.decryptionNonce = Buffer.allocUnsafe(BUFFER_SIZE)

    // reset their content (because we are using unsafe buffers)
    this.encryptionNonce.fill(0)
    this.decryptionNonce.fill(0)

    // copy the random part to the encryption and decryption nonce
    nonce.copy(this.encryptionNonce, 0, 0, BUFFER_OFFSET)
    nonce.copy(this.decryptionNonce, 0, 0, BUFFER_OFFSET)
  }

  /**
   * Encrypts a block
   * @param {Buffer} blockDataBuffer The buffer data to be encrypted.
   * @param {Key} hmacKey The key used for HMAC authentication. Can be different for each block if needed to.
   * @param {Buffer} iv A random 128 bits nonce
   * @return {{cipherText, mac}}} The encypted data Buffer and its MAC (Buffer)
   */
  encryptChunk (blockDataBuffer, hmacKey) {
    return new Promise((resolve, reject) => {
      // check that we did not reach the last possible amount of blocks we can encrypt,
      // before the counter rolls over
      if (this.encryptionNonce === MAX_BLOCKS) {
        reject(new Error('Reached the maximum amount of encryption blocks for this key. Generate a new key. Aborting encryption!'))
        return
      }

      // WARNING!!!
      // The chunk size must be exactly 16 bytes long!
      // Abort otherwise
      if (blockDataBuffer.length !== 16) {
        reject(new Error('Data block size is' + blockDataBuffer.length + '! Should be exactly 16 bytes! Aborting.'))
        return
      }

      // some checks just in case somebody will think to use the same key for both the
      // encryption and the hmac....
      if (this.key === hmacKey) {
        reject(new Error('key and hmac Key MUST be different!'))
        return
      }

      // ENCRYPT
      // concatenate the initialization vector (encryptionNonce 12 bytes random part) and the counter
      // to generate a nonce.
      this.encryptionNonce.writeInt32BE(this.counter, BUFFER_OFFSET)

      // create an instance of a cipher IV (nodejs weird naming here....)
      // also makes sure the nonce is exactly 16 bytes
      const cipher = crypto.createCipheriv(algorithm, this.key, this.encryptionNonce)

      // encrypt the data
      const cipherText = Buffer.concat([cipher.update(blockDataBuffer), cipher.final()])

      // THEN MAC
      const hmac = crypto.createHmac(macFunction, hmacKey)
      hmac.update(cipherText)
      const mac = hmac.digest()

      // increment the counter
      this.counter++

      // resolve the promise
      resolve({
        cipherText: cipherText,
        mac: mac
      })
    })
  }

  /**
   * Decrypts a chunk
   * @param {Buffer} cipherbBlockDataBuffer The data to be decrypted
   * @param {Buffer} macBuffer The MAC buffer data for integrity verification
   * @param {Buffer} hmacKey The HMAC key. Can be different from each block
   * @param {Number} counter The counter of the block to decrypt
   * @return {Buffer} Decrypted block.
   */
  decryptChunk (cipherbBlockDataBuffer, macBuffer, hmacKey, counter) {
    return new Promise((resolve, reject) => {
      // Calculate the HMAC of the ciphertext coming from the function parameter
      const hmac = crypto.createHmac(macFunction, hmacKey)
      hmac.update(cipherbBlockDataBuffer)
      const newMac = hmac.digest()

      // first of all verify the MAC matches the existing one
      const validMac = crypto.timingSafeEqual(newMac, macBuffer)

      if (!validMac) {
        reject(new Error('Invalid MAC validation! Aborting decryption.'))
        return
      }

      // create the decryption nonce
      this.decryptionNonce.writeInt32BE(counter, BUFFER_OFFSET)

      // create an instance of a decipher IV (nodejs weird naming here....)
      const cipher = crypto.createDecipheriv(algorithm, this.key, this.decryptionNonce)

      // decrypt the data\
      const clearText = Buffer.concat([cipher.update(cipherbBlockDataBuffer), cipher.final()])

      resolve(clearText)
    })
  }
}

// Export the FileCrypto class
module.exports = FileCrypto
