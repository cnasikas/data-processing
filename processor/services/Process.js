import Crypto from 'total-crypto'
import assert from 'assert'

export default class ProcessService {
  constructor (blockchain, listener) {
    this.blockchain = blockchain
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
    this.listener = listener
    this.registerToEvents()
    this.crypto = new Crypto()
  }

  decryptKey (cipher) {
    return this.crypto.pubDecrypt(process.env.SEC_KEY, cipher)
  }

  processData (symKey) {
    console.log(symKey)
  }

  async process (data) {
    try {
      let account = this.node.getDefaultAccount()
      let instance = await this.contracts.datastore.contract.deployed()
      let request = await instance.getRequestInfo.call(data._subscriber, {from: account, gas: 500000})
      let dataset = await instance.getDataSetInfo.call(request[0], {from: account, gas: 500000})
      let hash = this.crypto.hash([dataset[0], dataset[1], dataset[2], dataset[3]]) // name, location, category, account (controller)
      assert.equal(hash, dataset[4], 'Metadata hash not match!!')
      let symKey = this.decryptKey(data.cipher)
      this.processData(symKey)
    } catch (e) {
      throw new Error(e)
    }
  }

  registerToEvents () {
    this.listener.on('toProcess', (req) => {
      this.process({...req.args})
      .catch((err) => { console.log(err) })
    })
  }
}
