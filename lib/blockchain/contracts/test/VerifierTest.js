/* global describe, artifacts, contract, it, beforeEach, before */

/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-expressions */

/*
  Code by:
    https://github.com/christianlundkvist/libsnark-tutorial
*/

const fs = require('fs')
const util = require('util')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const VerifierContract = artifacts.require('Verifier')
const path = require('path')

chai.use(chaiAsPromised)
chai.should()

const readFile = util.promisify(fs.readFile)

const input = [1, 1, 1, 30]
const fakeInput = input.map((item) => 0)

contract('Verifier', (accounts) => {
  before(async () => {
    const proof = await readFile(path.join(__dirname, 'proof.json'))
    let vk = await readFile(path.join(__dirname, 'vk.json'))
    vk = JSON.parse(vk)
    /* eslint-disable-next-line camelcase */
    const { IC_length, input_length, ...rest } = vk
    this.vk = { ...rest }
    this.vkTotal = vk
    this.proof = JSON.parse(proof)
  })

  beforeEach(async () => {
    this.verifier = await VerifierContract.new()
  })

  describe('Proof verification', () => {
    it('successfully save a verification key', async () => {
      await this.verifier.setVerifyingKey(...Object.values(this.vk))
      const key = await this.verifier.verifyingKeySet.call()
      key.should.be.true
    })

    it('successfully verify a proof', async () => {
      await this.verifier.setVerifyingKey(...Object.values(this.vk))
      const key = await this.verifier.verifyingKeySet.call()
      key.should.be.true

      // call simulates transaction
      const verification = await this.verifier.verifyTx.call(...Object.values(this.proof), input)
      verification.should.be.true
    })

    it('shouldn not verify incorrect proof', async () => {
      await this.verifier.setVerifyingKey(...Object.values(this.vk))

      this.proof.AG = [0, 0]

      const wrongProof = await this.verifier.verifyTx.call(...Object.values(this.proof), input)
      const wrongInput = await this.verifier.verifyTx.call(...Object.values(this.proof), fakeInput)

      wrongProof.should.be.false
      wrongInput.should.be.false
    })
  })
})
