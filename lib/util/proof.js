const _ = require('lodash')

const PROOF_KEYS = ['AG', 'AH', 'BG', 'BH', 'CG', 'CH', 'H', 'K']

const parseG1Point = (data) => {
  var X = data[0]
  var Y = data[1]
  return [X, Y]
}

const parseG2Point = (data) => {
  var X = [data[0], data[1]]
  var Y = [data[2], data[3]]
  return [X, Y]
}

const parseVerificationKey = (vk) => {
  vk = vk.toString().replace(/\n/g, ' ').split(' ')
  const A = parseG2Point(vk)
  vk = vk.slice(4)
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

  return { A, B, C, gamma, gammaBeta1, gammaBeta2, Z, IC }
}

const parseProof = (proof) => {
  proof = proof.toString().replace(/\n/g, ' ').split(' ')

  const AG = parseG1Point(proof)
  proof = proof.slice(2)
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

  return { AG, AH, BG, BH, CG, CH, H, K }
}

const normalizeProof = (proof) => {
  return _.zipObject(PROOF_KEYS, proof)
}

module.exports = {
  parseProof,
  normalizeProof,
  parseVerificationKey
}
