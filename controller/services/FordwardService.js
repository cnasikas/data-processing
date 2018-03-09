/* TODO: Fix dependency on api. Create local modules. */

import Listener from './Listener.js'

export default class FordwardService {
  constructor (blockchain) {
    this.blockchain = blockchain
    this.listener = new Listener()
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
