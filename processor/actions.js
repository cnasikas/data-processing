import util from 'util'
import childProcess from 'child_process'

import Crypto from 'total-crypto'
import dsm from 'dataset-manager'

const PROVE_CMD = process.env.PROVE_CMD || 'prove.sh'

const crypto = new Crypto()
const datasetManager = dsm('http')
const exec = util.promisify(childProcess.exec)

const decryptKey = (cipher) => {
  return crypto.pubDecrypt(process.env.SEC_KEY, cipher)
}

const compute = async (filePath, symKey) => {
  console.log(`[*] Start generating proof of computation...`)
  const { stdout, stderr } = await exec(`${PROVE_CMD} sum`)
  console.log('stdout:', stdout)
  console.log('stderr:', stderr)
  console.log(`[*] Done!`)
}

const processData = async (symKey, location) => {
  try {
    console.log(`[*] Downloading dataset...`)
    const filePath = await datasetManager.download(location)
    console.log(`[*] Done!`)

    const iv = '3ec7cf091636fd12d28aeaa5e4d614e6'
    const hmacKey = '191a416b8e6e646e3787e3c5601a91985a8df8fdb1444e9d8862ed68719b8e8e'

    console.log(`[*] Decrypting dataset...`)
    const { absPath } = await crypto.decryptFile(symKey, hmacKey, filePath, iv)
    console.log(`[*] Done! At: ${absPath}`)
    compute(absPath, symKey)
  } catch (e) {
    console.log(e.message)
  }
}

const handleProcess = async (node, data) => {
  try {
    // TODO: Check if the address of the processor is the one that passed with the request
    let { _requestID, encryptedKey } = data
    console.log(`[*] Got new processing request with id: ${_requestID}`)

    // let account = node.getDefaultAccount()
    console.log(`[*] Getting request info...`)
    let request = await node.getRequestInfo(_requestID)
    let [_dataSetID, algorithmID, pubKey] = request

    console.log(`[*] Done: datasetID: ${_dataSetID}, algorithmID: ${algorithmID}, pubKey: ${pubKey}`)
    console.log(`[*] Getting dataset info...`)
    let dataset = await node.getDataSetInfo(_dataSetID)
    let [name, location] = dataset // name, location, category, metaHash, controller
    console.log(`[*] Done: name: ${name}, location: ${location}`)

    // let hash = this.crypto.hash([dataset[0], dataset[1], dataset[2], dataset[3]]) // name, location, category, account (controller)
    // assert.equal(hash, dataset[4], 'Metadata hash not match!!')
    console.log(`[*] Decrypting symetric key...`)
    let symKey = decryptKey(encryptedKey)
    console.log(`[*] Done!`)
    processData(symKey, location)
  } catch (e) {
    throw new Error(e)
  }
}

export {
  handleProcess
}
