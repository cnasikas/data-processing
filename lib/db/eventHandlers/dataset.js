const { saveWithAddress } = require('../methods')
const { Dataset } = require('../models')

const handleDataset = async (res) => {
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
