import Crypto from 'total-crypto'
import assert from 'assert'

const crypto = new Crypto()

const decryptKey = (cipher) => {
  return crypto.pubDecrypt(process.env.SEC_KEY, cipher)
}

const processData = (symKey) => {
  console.log(symKey)
}

const handleProcess = async (node, data) => {
  try {
    console.log(data)
    // TODO: Check if the address of the processor is the oen that passed with the request
    let {_processorAddress, _requestID, encryptedKey} = data
    let account = node.getDefaultAccount()
    let request = await node.getRequestInfo(_requestID)
    let [_dataSetID, algorithmID, pubKey] = request
    let dataset = await node.getDataSetInfo(_dataSetID)
    console.log(dataset)
    let [name, location] = dataset
    // let hash = this.crypto.hash([dataset[0], dataset[1], dataset[2], dataset[3]]) // name, location, category, account (controller)
    // assert.equal(hash, dataset[4], 'Metadata hash not match!!')
    let symKey = decryptKey(encryptedKey)
    processData(symKey)
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  handleProcess
}
