/* TODO: Fix dependency on api. Create local modules. */

import blockchain from 'blockchain'
import Crypto from 'total-crypto'

export default class Listener {
  constructor () {
    this.blockchain = blockchain()
    this.contracts = new this.blockchain.ContractService().getContracts()
    this.node = this.blockchain.node
    this.initListeners()
    this.crypto = new Crypto()
  }

  initListeners () {
    this.addRequestListener()
    .then((value) => {})
    .catch((err) => { console.log(err) })
  }

  async process (result) {
    let reqAddr = result.args.reqAddr
    let dataAddr = result.args.dataAddr

    console.log('Processing request from ' + reqAddr + ' for data ' + dataAddr)

    let instance = await this.contracts.datastore.contract.deployed()
    let pointer = await instance.getDataPointer(reqAddr)
    let key = await instance.getKey(reqAddr)
    let symKey = this.crypto.pubDecrypt(process.env.SEC_KEY, key)
  }

  async addRequestListener () {
    const request = await this.contracts.request.contract.deployed()

    request.RequestProcess().watch((error, result) => {
      if (error) {
        throw new Error('Error!')
      }

      this.process(result)
      .then((value) => {})
      .catch((err) => { console.log(err) })
    })
  }
}
