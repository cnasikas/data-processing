import Crypto from 'total-crypto'
import dsm from 'dataset-manager'
import path from 'path'
import logSymbols from 'log-symbols'

const crypto = new Crypto()
const DATASET_FOLDER = process.env.DATASET_FOLDER || 'datasets'

const datasetManager = dsm('http', path.join(__dirname, DATASET_FOLDER))

const encryptKey = (pubKey, symKey) => {
  let encKey = crypto.pubEncrypt(pubKey, symKey)
  let { iv, kemtag, ct } = JSON.parse(encKey)
  return JSON.stringify({ iv, kemtag, ct })
}

const selectProcessor = async (node) => {
  return node.getDefaultAccount()
}

const forwardToProcessor = async (node, data) => {
  try {
    let { _requestID, _dataSetID } = data
    console.log(logSymbols.info, `Got new request with id: ${_requestID}`)

    console.log(logSymbols.info, `Getting dataset info...`)
    let dataset = await node.getDataSetInfo(_dataSetID)
    console.log(logSymbols.success, 'Done!')

    /* eslint-disable-next-line no-unused-vars */
    let [name, location, category, metaHash, controller] = dataset

    if (controller === node.getDefaultAccount()) {
      console.log(logSymbols.info, `Getting processor...`)
      let account = await selectProcessor(node)
      let processor = await node.getProcessor(await node.getCurrentProcessor())
      console.log(logSymbols.success, 'Done!')

      let [name, pubkey] = processor

      console.log(logSymbols.info, `Reading symetric key from file...`)
      const symKey = await datasetManager.readKey(_dataSetID.substring(2))
      console.log(logSymbols.success, 'Done!')

      let cipher = encryptKey(pubkey, symKey)
      console.log(logSymbols.info, `Forwarding to processor: name: ${name}, address: ${account}`)
      const tx = await node.notifyProcessor(_requestID, cipher)
      console.log(logSymbols.success, `Fordward done. Tx: ${tx}`)
    } else {
      console.log(logSymbols.info, `Dataset is not mine!`)
    }
  } catch (e) {
    throw new Error(e)
  }
}

export {
  encryptKey,
  forwardToProcessor
}
