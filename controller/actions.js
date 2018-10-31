import Crypto from 'total-crypto'

const crypto = new Crypto()

const encryptKey = (key) => {
  let encKey = crypto.pubEncrypt(key, process.env.SYM_KEY)
  let { iv, kemtag, ct } = JSON.parse(encKey)
  return JSON.stringify({ iv, kemtag, ct })
}

const selectProcessor = async (node) => {
  return node.getDefaultAccount()
}

const forwardToProcessor = async (node, data) => {
  try {
    let { _requestID, _dataSetID } = data
    console.log(`[*] Got new request with id: ${_requestID}`)

    console.log(`[*] Getting dataset info...`)
    let dataset = await node.getDataSetInfo(_dataSetID)

    /* eslint-disable-next-line no-unused-vars */
    let [name, location, category, metaHash, controller] = dataset

    if (controller === node.getDefaultAccount()) {
      let account = await selectProcessor(node)
      let processor = await node.getProcessor(account)
      let [name, pubkey] = processor
      let cipher = encryptKey(pubkey)
      console.log(`[*] Forwarding to processor: name: ${name}, address: ${account}`)
      const tx = await node.notifyProcessor(account, _requestID, cipher)
      console.log(`[*] Fordward done. Tx: ${tx}`)
    } else {
      console.log(`[*] Dataset is not mine!`)
    }
  } catch (e) {
    throw new Error(e)
  }
}

export {
  encryptKey,
  forwardToProcessor
}
