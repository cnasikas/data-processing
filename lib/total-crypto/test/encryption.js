const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const Crypto = require('../Crypto.js')

const testKey = (key, length = 64) => {
  expect(key).to.be.a('string')
  expect(key).to.match(/[0-9A-Fa-f]{6}/g)
  expect(key).to.have.lengthOf(length)
}

describe('Encryption', function () {
  describe('Public encryption', function () {
    it('should encrypt and decrypt properly', function () {
      const c = new Crypto()
      const pair = c.generateKeyPair()
      const target = 'plaintext'
      const cipher = c.pubEncrypt(pair.pub, target)
      const plaintext = c.pubDecrypt(pair.sec, cipher)
      target.should.be.equal(plaintext)
    })
  })

  describe('File encryption', function () {
    it('should encrypt and decrypt properly')
  })
})
