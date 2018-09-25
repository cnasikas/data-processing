const blockchain = require('blockchain')
const { simpleSave } = require('../../methods')
const PROVIDER = 'http://localhost:7545'

const ledger = blockchain()
const node = new ledger.NodeClass(PROVIDER)

const _normalizeEntry = (entry, mapping) => {
  let obj = {}
  for (let key in mapping) {
    obj[key] = entry[mapping[key]]
  }
  return obj
}

const importEntries = async (entries, options = {}) => {
  for (let entry of entries) {
    const res = await node[options.contractFunc](...Object.values(entry))
    entry = _normalizeEntry(entry, options.mapping)
    entry.tx_id = res.tx
    const obj = { ...entry, ...options.dbExtras }
    await simpleSave(options.Model, obj)
  }
}

module.exports = {
  importEntries
}
