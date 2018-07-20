const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const Crypto = require('../Crypto.js')

const testKey = (key, length = 64) => {
  expect(key).to.be.a('string')
  expect(key).to.match(/[0-9A-Fa-f]{6}/g)
  expect(key).to.have.lengthOf(length)
}

describe('Hashing', function () {
  describe('Hash variables', function () {
    it('should hash a string', function () {
      const c = new Crypto()
      const preimage = 'plaintext'
      const image = '96d62e2abd3e42de5f50330fb8efc4c5599835278077b21e9aa0b33c1df07a1c'
      const hex = c.hash(preimage)
      hex.should.be.equal(image)
    })

    it('should hash an array', function () {
      const c = new Crypto()
      const preimage = ['1', '2', '3']
      const image = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
      const hex = c.hash(preimage)
      hex.should.be.equal(image)
    })
  })

  describe('File hashing', function () {
    it('should hash a file')
  })
})
