import validator from 'validator'
import BaseController from './BaseController'
import {escapeObject} from 'data-market-utils'

export default class ProcessorController extends BaseController {
  constructor () {
    super('Processor', '_id')
  }

  async create (req, res) {
    const blockchain = req.app.blockchain
    const db = req.app.db
    let account = blockchain.node.getDefaultAccount()
    let name = req.sanitize(req.body.name) || ''
    let pubKey = req.sanitize(req.body.pubkey) || ''

    if (validator.isEmpty(pubKey)) {
      return res.status(500).json({error: 'Empty public key is not allowed'})
    }

    if (!validator.isHexadecimal(pubKey)) {
      return res.status(500).json({error: 'Public key must be in hex'})
    }

    try {
      let instance = await blockchain.contracts.datastore.contract.deployed()
      let result = await instance.registerProcessor(account, blockchain.node.toBytes(name), pubKey, {from: account, gas: 500000})

      let out = {
        name,
        address: account,
        pubKey,
        contract_address: blockchain.contracts.datastore.contract.address,
        tx: result.tx,
        account,
        gasUsed: result.receipt.gasUsed
      }
      let data = await db.save('Processor', out)

      return res.json(escapeObject(data._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
