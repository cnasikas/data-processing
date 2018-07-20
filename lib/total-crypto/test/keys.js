const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const Crypto = require('../Crypto.js')

const testKey = (key, length = 64) => {
  expect(key).to.be.a('string')
  expect(key).to.match(/[0-9A-Fa-f]{6}/g)
  expect(key).to.have.lengthOf(length)
}

describe('Keys', function () {
  describe('Assymetric key: generateKeyPair', function () {
    it('should generate an assymetric key', function () {
      const c = new Crypto()
      const pair = c.generateKeyPair()
      expect(pair).to.be.an('object')
      expect(pair).to.have.all.keys('pub', 'sec')
      const pub = pair.pub
      const sec = pair.sec
      testKey(pub, 128)
      testKey(sec)
    })
  })

  describe('Symmetric key: generateKey', function () {
    it('should generate a symetric key', function () {
      const c = new Crypto()
      const key = c.generateKey()
      testKey(key)
    })
  })
})
