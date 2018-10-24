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

const input = [35]
const fakeInput = input.map((item) => 0)

const parseG1Point = (data) => {
  var X = data[0]
  var Y = data[1]
  return [X, Y]
}

const parseG2Point = (data) => {
  var X = [data[1], data[0]]
  var Y = [data[3], data[2]]
  return [X, Y]
}

const setVerificationKey = async () => {
  const A = parseG2Point(this.vk)
  let vk = this.vk.slice(4)
  const B = parseG1Point(vk)
  vk = vk.slice(2)
  const C = parseG2Point(vk)
  vk = vk.slice(4)
  const gamma = parseG2Point(vk)
  vk = vk.slice(4)
  const gammaBeta1 = parseG1Point(vk)
  vk = vk.slice(2)
  const gammaBeta2 = parseG2Point(vk)
  vk = vk.slice(4)
  const Z = parseG2Point(vk)
  vk = vk.slice(4)
  let IC = []

  while (vk !== [] && vk[0] !== '') {
    IC.push(parseG1Point(vk))
    vk = vk.slice(2)
  }

  await this.verifier.setVerifyingKey(A, B, C, gamma, gammaBeta1, gammaBeta2, Z, IC)
}

contract('Verifier', (accounts) => {
  before(async () => {
    const data = await readFile(path.join(__dirname, 'vk'))
    const proof = await readFile(path.join(__dirname, 'proof'))

    this.vk = data.toString().replace(/\n/g, ' ').split(' ')
    this.proof = proof.toString().replace(/\n/g, ' ').split(' ')
  })

  beforeEach(async () => {
    this.verifier = await VerifierContract.new()
  })

  describe('Proof verification', () => {
    it('successfully save a verification key', async () => {
      await setVerificationKey()
      const key = await this.verifier.verifyingKeySet.call()
      key.should.be.true
    })

    it('successfully verify a proof', async () => {
      await setVerificationKey()
      const key = await this.verifier.verifyingKeySet.call()
      key.should.be.true

      const AG = parseG1Point(this.proof)
      let proof = this.proof.slice(2)
      const AH = parseG1Point(proof)
      proof = proof.slice(2)
      const BG = parseG2Point(proof)
      proof = proof.slice(4)
      const BH = parseG1Point(proof)
      proof = proof.slice(2)
      const CG = parseG1Point(proof)
      proof = proof.slice(2)
      const CH = parseG1Point(proof)
      proof = proof.slice(2)
      const H = parseG1Point(proof)
      proof = proof.slice(2)
      const K = parseG1Point(proof)
      proof = proof.slice(2)

      // call simulates transaction
      const verification = await this.verifier.verifyTx.call(AG, AH, BG, BH, CG, CH, H, K, [35])
      verification.should.be.true
    })

    it('shouldn not verify incorrect proof', async () => {
      await setVerificationKey()

      const AG = parseG1Point(this.proof)
      let proof = this.proof.slice(2)
      const AH = parseG1Point(proof)
      proof = proof.slice(2)
      const BG = parseG2Point(proof)
      proof = proof.slice(4)
      const BH = parseG1Point(proof)
      proof = proof.slice(2)
      const CG = parseG1Point(proof)
      proof = proof.slice(2)
      const CH = parseG1Point(proof)
      proof = proof.slice(2)
      const H = parseG1Point(proof)
      proof = proof.slice(2)
      const K = parseG1Point(proof)
      proof = proof.slice(2)

      const wrongProof = await this.verifier.verifyTx.call([0, 0], AH, BG, BH, CG, CH, H, K, input)
      const wrongInput = await this.verifier.verifyTx.call(AG, AH, BG, BH, CG, CH, H, K, fakeInput)

      wrongProof.should.be.false
      wrongInput.should.be.false
    })
  })
})
