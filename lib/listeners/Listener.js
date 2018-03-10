const EventEmitter = require('events')
const blockchain = require('blockchain')

module.exports = class Listener extends EventEmitter {
  constructor () {
    super()
    this.blockchain = blockchain()
    this.contracts = new this.blockchain.ContractService().getContracts()
    this.node = this.blockchain.node
    this.initListeners()
  }

  initListeners () {
    this.addRequestListener()
  }

  addRequestListener () {
    this.contracts.datastore.contract.deployed()
    .then((dataStore) => {
      dataStore.NewRequest({provider: this.node.getDefaultAccount()}).watch((error, result) => {
        if (error) {
          throw new Error('Error!')
        }
        this.emit('request', result)
      })
    })
  }
}
