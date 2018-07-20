const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const Crypto = require('../Crypto.js')

const testKey = (key, length = 64) => {
  expect(key).to.be.a('string')
  expect(key).to.match(/[0-9A-Fa-f]{6}/g)
  expect(key).to.have.lengthOf(length)
}

describe('Various', function () {
  describe('utils', function () {
    it('should convert a hex to bytes and vice versa', function () {
      const c = new Crypto()
      const target = 'ae8fa8dc46cc30b8c087f5d8323829bed646c921304d6a2bf48e21daad06403b'
      const bytes = c.hextoBytes(target)
      const hex = c.bytesToHex(bytes)
      target.should.be.equal(hex)
    })
  })
})
