const EventEmitter = require('events')

module.exports = class Listener extends EventEmitter {
  constructor (node, contracts) {
    super()
    this.contracts = contracts
    this.node = node
    this.events = {
      'NewRequest': 'request',
      'Process': 'toProcess',
      'NewDataSet': 'dataset',
      'NewProcessor': 'processor',
      'NewProvider': 'provider'
    }
    this.initListeners()
  }

  initListeners () {
    for (let ev in this.events) {
      this.addListener(ev)
    }
  }

  addListener (key) {
    this.contracts.datastore.contract.deployed()
      .then((dataStore) => {
        dataStore[key]().watch((error, result) => {
          if (error) {
            throw new Error('Error!')
          }
          this.emit(this.events[key], result)
        })
      })
  }
}
