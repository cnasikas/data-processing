const { hexToAscii } = require('web3-utils')
const { trimNullBytes } = require('data-market-utils')
const { saveWithAddress } = require('../methods')
const models = require('../models')

const handleProcessor = (res) => {
  return handleEntity('Processor', res)
}

const handleController = (res) => {
  return handleEntity('Controller', res)
}

const handleEntity = async (key, res) => {
  res.args.name = trimNullBytes(hexToAscii(res.args.name))

  const obj = {
    tx_id: res.transactionHash,
    name: res.args.name,
    pub_key: res.args.pubKey,
    status: 'confirmed'
  }

  const address = res.args._processorAddress || res.args._controllerAddress

  try {
    await saveWithAddress(models[key], { ...obj }, address)
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  handleEntity,
  handleProcessor,
  handleController
}
