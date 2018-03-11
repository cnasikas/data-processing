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

  async process (data) {
    try {
      let account = this.node.getDefaultAccount()
      let instance = await this.contracts.datastore.contract.deployed()
      let dataset = await instance.getDataSetInfo(data._dataSetID, {from: account, gas: 500000})
      let hash = this.crypto.hash([dataset[1], dataset[2], dataset[3], dataset[0]])

      assert.equal(hash, dataset[4], 'Dataset hash not match!!')
    } catch (e) {
      throw new Error(e)
    }
  }

  registerToEvents () {
    this.listener.on('toProcess', (req) => {
      this.process({...req.args})
    })
  }
}
