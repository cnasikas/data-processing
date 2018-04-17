import BaseController from './BaseController'
import validator from 'validator'
import {escapeObject} from 'data-market-utils'

export default class RequestController extends BaseController {
  constructor () {
    super('Request', '_id')
  }

  async create (req, res) {
    const blockchain = req.app.blockchain
    const db = req.app.db
    let datasetSlug = req.sanitize(req.body.dataset) || ''
    let queryID = req.sanitize(req.body.query) || ''
    let pubKey = req.sanitize(req.body.pubkey) || ''

    if (validator.isEmpty(pubKey)) {
      return res.status(500).json({error: 'Empty public key is not allowed'})
    }

    if (!validator.isHexadecimal(pubKey)) {
      return res.status(500).json({error: 'Public key must be in hex'})
    }

    let account = blockchain.node.getDefaultAccount()

    try {
      let instance = await blockchain.contracts.datastore.contract.deployed()
      let dataset = await instance.getDataSetInfo.call(blockchain.node.toBytes(datasetSlug), {gas: 500000})
      let result = await instance.requestProcessing(blockchain.node.toBytes(datasetSlug), account, blockchain.node.toBytes(queryID), pubKey, {gas: 500000})

      let out = {
        contract_address: blockchain.contracts.datastore.contract.address,
        tx: result.tx,
        account: blockchain.node.getDefaultAccount(),
        data: datasetSlug,
        provider: dataset[0],
        processed: false,
        proof: false,
        queryID,
        pubKey,
        gasUsed: result.receipt.gasUsed
      }

      let data = await db.save('Request', out)
      res.json(escapeObject(data._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    const db = req.app.db
    try {
      let request = await db.get('Request', id)
      res.json(escapeObject(request._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
