import validator from 'validator'
import BaseController from './BaseController'
import Processor from '../db/models/Processor'
import {escapeObject} from 'data-market-utils'

export default class ProcessorController extends BaseController {
  constructor (blockchain) {
    super(Processor, '_id', blockchain)
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
  }

  async create (req, res) {
    let account = this.node.getDefaultAccount()
    let name = req.sanitize(req.body.name) || ''
    let pubKey = req.sanitize(req.body.pubkey) || ''

    if (validator.isEmpty(pubKey)) {
      return res.status(500).json({error: 'Empty public key is not allowed'})
    }

    if (!validator.isHexadecimal(pubKey)) {
      return res.status(500).json({error: 'Public key must be in hex'})
    }

    try {
      let instance = await this.contracts.datastore.contract.deployed()
      let result = await instance.registerProcessor(account, this.node.toBytes(name), pubKey, {from: account, gas: 500000})

      let out = {
        name,
        address: account,
        pubKey,
        contract_address: this.contracts.datastore.contract.address,
        tx: result.tx,
        account,
        gasUsed: result.receipt.gasUsed
      }

      let data = await new Processor(out).save()

      return res.json(escapeObject(data))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
