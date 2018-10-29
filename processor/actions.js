import util from 'util'
import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

import Crypto from 'total-crypto'
import dsm from 'dataset-manager'
import { parseProof } from 'data-market-utils'

const PROVE_CMD = process.env.PROVE_CMD || 'prove.sh'
const DATASET_FOLDER = process.env.DATASET_FOLDER || 'datasets'

const crypto = new Crypto()
const datasetManager = dsm('http', DATASET_FOLDER)
const exec = util.promisify(childProcess.exec)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

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
  console.log(`[*] Downloading dataset...`)
  const filePath = await datasetManager.download(location)
  console.log(`[*] Done!`)

  const iv = '3ec7cf091636fd12d28aeaa5e4d614e6'
  const hmacKey = '191a416b8e6e646e3787e3c5601a91985a8df8fdb1444e9d8862ed68719b8e8e'

  console.log(`[*] Decrypting dataset...`)
  const { absPath } = await crypto.decryptFile(symKey, hmacKey, filePath, iv)
  console.log(`[*] Done! At: ${absPath}`)
  await compute(absPath, symKey)
}

const saveSymKey = async (symKey, datasetID, filePath) => {
  const fileName = `${datasetID}.sym`
  const file = path.join(filePath, fileName)
  await writeFile(file, symKey)
}

const saveProofToBlockchain = async (node, datasetID, requestID) => {
  const proofFile = `${DATASET_FOLDER}/${datasetID}.proof`

  /* Proof is small and constant so it is ok to load the file to memory */
  let proof = await readFile(path.join(__dirname, proofFile))
  proof = parseProof(proof)
  const tx = await node.addProof(requestID, proof)
  console.log(`[*] Proof saved. Tx: ${tx}`)
}

const handleProcess = async (node, data) => {
  try {
    let { _processorAddress, _requestID, encryptedKey } = data

    if (_processorAddress === node.getDefaultAccount()) {
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

      console.log(`[*] Saving symetric key...`)
      await saveSymKey(symKey, _dataSetID.substring(2), path.join(__dirname, DATASET_FOLDER))
      console.log(`[*] Done!`)

      await processData(symKey, location)

      console.log(`[*] Saving proof to the blockchain...`)
      await saveProofToBlockchain(node, _dataSetID.substring(2), _requestID)
      console.log(`[*] Done!`)
    } else {
      console.log(`[*] Process request not assigned to me!`)
    }
  } catch (e) {
    throw new Error(e)
  }
}

export {
  handleProcess
}
