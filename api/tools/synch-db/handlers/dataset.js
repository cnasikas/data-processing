const {saveWithAddress} = require('./save')
const {Dataset} = require('../../../models')

// const ETH_TO_WEI = 1000000000000000000

const handleDataset = async (res) => {
  const obj = {
    tx_id: res.transactionHash,
    hash: res.args.hash,
    name: res.args.name,
    location: res.args.location,
    category: res.args.category,
    meta_hash: res.args.metaHash,
    status: 'confirmed'
  }

  try {
    await saveWithAddress(Dataset, {...obj}, res.args.controller)
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  handleDataset
}
