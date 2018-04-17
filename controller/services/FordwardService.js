import Crypto from 'total-crypto'

export default class FordwardService {
  constructor (blockchain, listener) {
    this.blockchain = blockchain
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
    this.listener = listener
    this.crypto = new Crypto()
    this.registerToEvents()
  }

  encryptKey (key) {
    let encKey = this.crypto.pubEncrypt(key, process.env.SYM_KEY)
    let {iv, kemtag, ct} = JSON.parse(encKey)
    return JSON.stringify({iv, kemtag, ct})
  }

  async forwardToProcessor (data) {
    try {
      let account = this.node.getDefaultAccount()
      let instance = await this.contracts.datastore.contract.deployed()
      // to be change. Rotate processors creating a linked list inside smart contract
      let processor = await instance.getDataProcessorInfo.call(account, {from: account, gas: 500000})
      let cipher = this.encryptKey(processor[2])
      let notify = await instance.notifyProcessor(processor[0], data._subscriber, cipher)
    } catch (e) {
      throw new Error(e)
    }
  }

  registerToEvents () {
    this.listener.on('request', (req) => {
      // TODO: Chech if the controller is the owner of the set by address
      this.forwardToProcessor({...req.args})
        .catch((err) => { console.log(err) })
    })
  }
}
