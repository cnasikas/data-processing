import util from 'util'
import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'

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

const processData = async (processingInfo) => {
  console.log(`[*] Downloading dataset...`)
  const filePath = await datasetManager.download(processingInfo.dataset.location)
  console.log(`[*] Done!`)

  const iv = '3ec7cf091636fd12d28aeaa5e4d614e6'
  const hmacKey = '191a416b8e6e646e3787e3c5601a91985a8df8fdb1444e9d8862ed68719b8e8e'

  console.log(`[*] Decrypting dataset...`)
  const { absPath } = await crypto.decryptFile(processingInfo.dataset.symKey, hmacKey, filePath, iv)
  console.log(`[*] Done! At: ${absPath}`)

  await compute(absPath, processingInfo.dataset.symKey)

  return {
    dataset: {
      filePath,
      absPath
    }
  }
}

const saveSymKey = async (symKey, datasetID, filePath) => {
  const fileName = `${datasetID}.sym`
  const file = path.join(filePath, fileName)
  await writeFile(file, symKey)
}

const saveProofToBlockchain = async (node, processingInfo) => {
  console.log(`[*] Saving proof to the blockchain...`)
  const datasetID = processingInfo.dataset.id.substring(2)
  const proofFile = `${DATASET_FOLDER}/${datasetID}.proof`

  /* Proof is small and constant so it is ok to load the file to memory */
  let proof = await readFile(path.join(__dirname, proofFile))
  proof = parseProof(proof)
  const tx = await node.addProof(processingInfo.request.id, proof)
  console.log(`[*] Proof saved. Tx: ${tx}`)
}

const getRequestInfo = async (node, processingInfo) => {
  console.log(`[*] Getting request info...`)
  const request = await node.getRequestInfo(processingInfo.request.id)
  let [_dataSetID, algorithmID, pubKey] = request

  console.log(`[*] Done: datasetID: ${_dataSetID}, algorithmID: ${algorithmID}, pubKey: ${pubKey}`)
  console.log(`[*] Getting dataset info...`)
  let dataset = await node.getDataSetInfo(_dataSetID)
  let [name, location] = dataset // name, location, category, metaHash, controller
  console.log(`[*] Done: name: ${name}, location: ${location}`)

  return {
    request: {
      algorithmID,
      pubKey
    },
    dataset: {
      id: _dataSetID,
      name,
      location
    }
  }
}

const handleFileKey = async (processingInfo) => {
  console.log(`[*] Decrypting symetric key...`)
  let symKey = decryptKey(processingInfo.fileKey.cipher)
  console.log(`[*] Done!`)

  console.log(`[*] Saving symetric key...`)
  await saveSymKey(symKey, processingInfo.dataset.id.substring(2), path.join(__dirname, DATASET_FOLDER))
  console.log(`[*] Done!`)

  return {
    dataset: { symKey },
    fileKey: { plain: symKey }
  }
}

const handleProcess = async (node, data) => {
  try {
    let { _processorAddress, _requestID, encryptedKey } = data

    if (_processorAddress === node.getDefaultAccount()) {
      console.log(`[*] Got new processing request with id: ${_requestID}`)
      /* eslint-disable-next-line no-unused-vars */
      let processingInfo = {
        request: {
          id: _requestID
        },
        fileKey: {
          cipher: encryptedKey
        }
      }

      const requestInfo = await getRequestInfo(node, processingInfo)
      processingInfo = _.merge(processingInfo, requestInfo)

      const keyInfo = await handleFileKey(processingInfo)
      processingInfo = _.merge(processingInfo, keyInfo)

      const processInfo = await processData(processingInfo)
      processingInfo = _.merge(processingInfo, processInfo)

      await saveProofToBlockchain(node, processingInfo)
    } else {
      console.log(`[*] Process request not assigned to me!`)
    }
  } catch (err) {
    throw err
  }
}

export {
  handleProcess
}
