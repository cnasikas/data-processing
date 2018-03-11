const EventEmitter = require('events')

module.exports = class Listener extends EventEmitter {
  constructor (node, contracts) {
    super()
    this.contracts = contracts
    this.node = node
    this.initListeners()
  }

  initListeners () {
    this.addRequestListener()
    this.addToProcessListener()
  }

  addRequestListener () {
    this.contracts.datastore.contract.deployed()
    .then((dataStore) => {
      dataStore.NewRequest({_provider: this.node.getDefaultAccount()}).watch((error, result) => {
        if (error) {
          throw new Error('Error!')
        }
        this.emit('request', result)
      })
    })
  }

  addToProcessListener () {
    this.contracts.datastore.contract.deployed()
    .then((dataStore) => {
      dataStore.Process().watch((error, result) => {
        if (error) {
          throw new Error('Error!')
        }
        this.emit('toProcess', result)
      })
    })
  }
}
