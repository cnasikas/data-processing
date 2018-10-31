const { saveWithAddress } = require('../methods')
  res.args.name = trimNullBytes(hexToAscii(res.args.name))

const handleEntity = async (Model, res) => {
  const obj = {
    tx_id: res.transactionHash,
    name: res.args.name,
    pub_key: res.args.pubKey,
    status: 'confirmed'
  }

  const address = res.args._processorAddress || res.args._controllerAddress

  try {
    await saveWithAddress(Model, { ...obj }, address)
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  handleEntity
}
