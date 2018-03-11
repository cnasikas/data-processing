export default class FordwardService {
  constructor (blockchain, listener) {
    this.blockchain = blockchain
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
    this.listener = listener
    this.registerToEvents()
  }

  async forwardToProcessor (data) {
    try {
      let account = this.node.getDefaultAccount()
      let instance = await this.contracts.datastore.contract.deployed()
      // to be change. Rotate processors creating a linked list inside smart contract
      let processor = await instance.getDataProcessorInfo(account, {from: account, gas: 500000})
      let notify = await instance.notifyProcessor(processor[0], data._dataSetID)
    } catch (e) {
      throw new Error(e)
    }
  }

  registerToEvents () {
    this.listener.on('request', (req) => {
      this.forwardToProcessor({...req.args})
    })
  }
}
