const _ = require('lodash')

const PROOF_KEYS = ['AG', 'AH', 'BG', 'BH', 'CG', 'CH', 'H', 'K']

const trimNullBytes = (str) => {
  return str.replace(/\0/g, '')
}

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

const awaitEvent = (event, handler) => {
  return new Promise((resolve, reject) => {
    const wrappedHandler = (...args) => {
      Promise.resolve(handler(...args)).then(resolve).catch(reject)
    }

    event.watch(wrappedHandler)
  })
}

const registerEntity = async (dataStore, web3, entity, options = {}) => {
  entity.key = `${entity.key[0].toUpperCase()}${entity.key.slice(1)}`
  const functionKey = `register${entity.key}`
  const tx = await dataStore[functionKey](entity.account, web3.fromAscii(entity.name), entity.pubKey, { ...options })
  return tx
}

const registerDataset = async (dataStore, web3, dataset, account) => {
  const tx = await dataStore.registerDataSet(
    dataset.hash,
    web3.fromAscii(dataset.name),
    dataset.location, web3.fromAscii(dataset.category),
    JSON.stringify(dataset.metadata),
    { from: account }
  )
  return tx
}

const requestProcessing = async (dataStore, web3, dataset, request, account) => {
  const tx = await dataStore.requestProcessing(
    dataset.hash,
    web3.fromAscii(request.algorithm),
    request.pubKey,
    { from: account }
  )
  return tx
}

module.exports = {
  trimNullBytes,
  parseProof,
  normalizeProof,
  awaitEvent,
  registerEntity,
  registerDataset,
  requestProcessing
}
