import Crypto from 'total-crypto'

export default class ProcessService {
  constructor (blockchain, db) {
    this.blockchain = blockchain
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
    this.listener = this.blockchain.listener
    this.db = db
    this.registerToEvents()
    this.crypto = new Crypto()
  }

  registerToEvents () {
    this.listener.on('toProcess', (req) => {

    })

    this.listener.on('request', (req) => {

    })

    this.listener.on('dataset', (req) => {

    })

    this.listener.on('processor', (req) => {

    })

    this.listener.on('provider', (req) => {

    })
  }
}
