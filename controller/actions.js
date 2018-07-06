import Crypto from 'total-crypto'
import blockchain from 'blockchain'

const crypto = new Crypto()
const ledger = blockchain()

const encryptKey = (key) => {
  let encKey = crypto.pubEncrypt(key, process.env.SYM_KEY)
  let {iv, kemtag, ct} = JSON.parse(encKey)
  return JSON.stringify({iv, kemtag, ct})
}

const forwardToProcessor = async (data) => {
  try {
    console.log(data)
    // const hex = '3dd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab'
    // const hex = '3dd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab'
    // const bytes = node.toBytes(hex)
    // let account = node.getDefaultAccount()
    // let instance = await this.contracts.datastore.contract.deployed()
    // let processor = await instance.getDataProcessorInfo.call(account, {from: account, gas: 500000})
    // let cipher = this.encryptKey(processor[2])
    // let notify = await instance.notifyProcessor(processor[0], data._subscriber, cipher)
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  encryptKey,
  forwardToProcessor
}
