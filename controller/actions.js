import Crypto from 'total-crypto'

const crypto = new Crypto()

const encryptKey = (key) => {
  let encKey = crypto.pubEncrypt(key, process.env.SYM_KEY)
  let { iv, kemtag, ct } = JSON.parse(encKey)
  return JSON.stringify({ iv, kemtag, ct })
}

const forwardToProcessor = async (node, data) => {
  try {
    let { _requestID } = data
    console.log(`[*] Got new request with id: ${_requestID}`)
    // const bytes = node.toBytes(hex)
    let account = node.getDefaultAccount()
    let processor = await node.getProcessor(account)
    let [name, pubkey] = processor
    let cipher = encryptKey(pubkey)
    console.log(`[*] Forwarding to processor: name: ${name}, address: ${account}`)
    const tx = await node.notifyProcessor(account, _requestID, cipher)
    console.log(`[*] Fordward done. Tx: ${tx}`)
  } catch (e) {
    throw new Error(e)
  }
}

export {
  encryptKey,
  forwardToProcessor
}
