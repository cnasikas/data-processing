const _ = require('lodash')

const PROOF_KEYS = ['AG', 'AH', 'BG', 'BH', 'CG', 'CH', 'H', 'K']

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
  normalizeProof
}
