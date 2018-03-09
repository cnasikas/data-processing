/* TODO: Fix dependency on api. Create local modules. */

import EventEmitter from 'events'
import blockchain from 'blockchain'
import Crypto from 'total-crypto'

export default class Listener extends EventEmitter {
  constructor () {
    super()
    this.blockchain = blockchain()
    this.contracts = new this.blockchain.ContractService().getContracts()
    this.node = this.blockchain.node
    this.initListeners()
    this.crypto = new Crypto()
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
