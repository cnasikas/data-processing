const {saveWithAddress} = require('../methods')

const handleEntity = async (Model, res) => {
  const obj = {
    tx_id: res.transactionHash,
    name: res.args.name,
    pub_key: res.args.pubKey,
    status: 'confirmed'
  }
  try {
    await saveWithAddress(Model, {...obj}, res.args._processorAddress)
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  handleEntity
}
