const {Request, Dataset, Algorithm} = require('../models')
const {trimNullBytes} = require('../utils.js')
const {findModel, saveWithAddress} = require('../methods')

// const ETH_TO_WEI = 1000000000000000000

const handleRequest = async (res) => {
  const obj = {
    tx_id: res.transactionHash,
    dataset_id: res.args._dataSetID,
    blockchain_id: res.args._requestID,
    algorithm_id: res.args.algorithmID,
    pub_key: res.args.pubKey,
    processed: false,
    status: 'confirmed'
  }

  try {
    const dataset = await findModel(Dataset, {hash: trimNullBytes(obj.dataset_id)})
    const algo = await findModel(Algorithm, {name: trimNullBytes(obj.algorithm_id)})

    obj.dataset_id = dataset.id
    obj.algorithm_id = algo.id
    await saveWithAddress(Request, {...obj}, res.args._requestor)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  handleRequest
}