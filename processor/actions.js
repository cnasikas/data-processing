import util from 'util'
import childProcess from 'child_process'
import path from 'path'
import _ from 'lodash'
import logSymbols from 'log-symbols'

import Crypto from 'total-crypto'
import dsm from 'dataset-manager'

const PROVE_CMD = process.env.PROVE_CMD || 'prove.sh'
const DATASET_FOLDER = process.env.DATASET_FOLDER || 'datasets'

const crypto = new Crypto()
const datasetManager = dsm('http', path.join(__dirname, DATASET_FOLDER))
const exec = util.promisify(childProcess.exec)

const decryptKey = (cipher) => {
  return crypto.pubDecrypt(process.env.SEC_KEY, cipher)
}

const encryptOutput = (pubKey, out) => {
  let encKey = crypto.pubEncrypt(pubKey, JSON.stringify(out))
  let { iv, kemtag, ct } = JSON.parse(encKey)
  return JSON.stringify({ iv, kemtag, ct })
}

const compute = async (processingInfo) => {
  const datasetID = processingInfo.dataset.id.substring(2)
  const algorithmID = processingInfo.request.algorithmID

  if (await datasetManager.proofExists(datasetID, algorithmID)) {
    console.log(logSymbols.info, `Proof already exists! Skipping computation`)
    return
  }

  console.log(logSymbols.info, `Start generating proof of computation...`)
  const { stdout, stderr } = await exec(`${PROVE_CMD} ${algorithmID}`)

  console.log(logSymbols.info, 'stdout:', stdout)
  console.log(logSymbols.error, 'stderr:', stderr)
  await datasetManager.moveZKPFiles(process.env.PROOF_FOLDER, datasetID, processingInfo.request.algorithmID)
  console.log(logSymbols.success, `Done!`)
}

const processData = async (processingInfo) => {
  const datasetID = processingInfo.dataset.id.substring(2)

  console.log(logSymbols.info, `Downloading dataset...`)
  await datasetManager.download(datasetID, processingInfo.dataset.location)
  console.log(logSymbols.success, `Done!`)

  const metadata = JSON.parse(processingInfo.dataset.metadata)

  const src = datasetManager.getEncPath(datasetID)
  const dest = datasetManager.getDecPath(datasetID)

  console.log(logSymbols.info, `Decrypting dataset...`)

  await crypto.decryptFile(processingInfo.dataset.symKey, src, dest, metadata.iv)
  console.log(logSymbols.success, `Done! At: ${dest}`)

  await compute(processingInfo)

  return {
    dataset: {
      src,
      dest
    }
  }
}

const saveProofToBlockchain = async (node, processingInfo) => {
  console.log(logSymbols.info, `Saving proof to the blockchain...`)
  const datasetID = processingInfo.dataset.id.substring(2)

  /* Proof is small and constant (~300 bytes) so it is ok to load the file to memory   */
  let proof = await datasetManager.readProof(datasetID, processingInfo.request.algorithmID)
  let inputs = await datasetManager.readInput(datasetID, processingInfo.request.algorithmID)
  let output = await datasetManager.readOutput(datasetID, processingInfo.request.algorithmID)

  output = encryptOutput(processingInfo.request.pubKey, output)
  proof = JSON.parse(proof)

  const tx = await node.addProof(processingInfo.request.id, proof, output, inputs)
  console.log(logSymbols.success, `Proof saved. Tx: ${tx}`)
}

const getRequestInfo = async (node, processingInfo) => {
  console.log(logSymbols.info, `Getting request info...`)
  const request = await node.getRequestInfo(processingInfo.request.id)
  let [_dataSetID, algorithmID, pubKey] = request

  console.log(logSymbols.success, `Done: datasetID: ${_dataSetID}, algorithmID: ${algorithmID}, pubKey: ${pubKey}`)
  console.log(logSymbols.info, `Getting dataset info...`)
  let dataset = await node.getDataSetInfo(_dataSetID)
  let [name, location, category, metadata, controller] = dataset // name, location, category, metadata, controller
  console.log(logSymbols.success, `Done: name: ${name}, location: ${location}`)

  return {
    request: {
      algorithmID,
      pubKey
    },
    dataset: {
      id: _dataSetID,
      name,
      location,
      category,
      metadata,
      controller
    }
  }
}

const handleFileKey = async (processingInfo) => {
  console.log(logSymbols.info, `Decrypting symetric key...`)
  let symKey = decryptKey(processingInfo.fileKey.cipher)
  console.log(logSymbols.success, `Done!`)

  console.log(logSymbols.info, `Saving symetric key...`)
  await datasetManager.writeKey(processingInfo.dataset.id.substring(2), symKey)
  console.log(logSymbols.success, `Done!`)

  return {
    dataset: { symKey },
    fileKey: { plain: symKey }
  }
}

const handleProcess = async (node, data) => {
  try {
    let { _processorAddress, _requestID, encryptedKey } = data

    if (_processorAddress === node.getDefaultAccount()) {
      console.log(logSymbols.info, `Got new processing request with id: ${_requestID}`)
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
      console.log(logSymbols.warning, `Process request not assigned to me!`)
    }
  } catch (err) {
    throw err
  }
}

export {
  handleProcess
}
