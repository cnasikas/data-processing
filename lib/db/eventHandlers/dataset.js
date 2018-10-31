const { hexToAscii } = require('web3-utils')
const { trimNullBytes } = require('data-market-utils')
const { saveWithAddress } = require('../methods')
const { Dataset } = require('../models')

const handleDataset = async (res) => {
  res.args.name = trimNullBytes(hexToAscii(res.args.name))
  res.args.hash = res.args.hash.substring(2)
  res.args.category = trimNullBytes(hexToAscii(res.args.category))

  const obj = {
    tx_id: res.transactionHash,
    hash: res.args.hash,
    name: res.args.name,
    location: res.args.location,
    category: res.args.category,
    metadata: res.args.metadata,
    status: 'confirmed'
  }

  try {
    await saveWithAddress(Dataset, { ...obj }, res.args.controller)
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  handleDataset
}
