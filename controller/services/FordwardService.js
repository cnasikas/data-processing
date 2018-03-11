export default class FordwardService {
  constructor (blockchain, listener) {
    this.blockchain = blockchain
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
    this.listener = listener
    this.registerToEvents()
  }

  forwardToProcessor (data) {
    console.log(data)
  }

  registerToEvents () {
    this.listener.on('request', (req) => {
      this.forwardToProcessor({...req.args})
    })
  }
}
