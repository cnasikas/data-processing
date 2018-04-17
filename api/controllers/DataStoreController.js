import _ from 'lodash'
import BaseController from './BaseController'
import Crypto from 'total-crypto'
import {escapeObject, slugify} from 'data-market-utils'

export default class DataController extends BaseController {
  constructor () {
    super('Data', '_id')
    this.crypto = new Crypto()
  }

  async create (req, res) {
    /* TODO: Hanlde null values on post */
    const blockchain = req.app.blockchain
    const db = req.app.db
    let account = blockchain.node.getDefaultAccount()
    let location = req.body.location || ''
    let digest = req.body.digest || ''
    location = req.sanitize(location)
    digest = req.sanitize(digest) // data hash provided from the data provider / controller
    const contracts = blockchain.contracts

    if (_.isEmpty(location) || _.isEmpty(digest)) {
      return res.status(500).json({error: 'Empty location or digest is not allowed'})
    }

    let name = req.sanitize(req.body.name)
    let slug = slugify(name)
    let category = req.sanitize(req.body.category)
    let hash = this.crypto.hash([name, location, category, account]) // meta data hash

    try {
      let instance = await contracts.datastore.contract.deployed()
      let result = await instance.registerDataSet(blockchain.node.toBytes(slug), name, location, category, hash, account, digest, {from: account, gas: 500000})

      let out = {
        slug,
        name,
        location,
        category,
        hash,
        digest,
        contract_address: contracts.datastore.contract.address,
        tx: result.tx,
        account,
        gasUsed: result.receipt.gasUsed
      }

      let data = await db.save('Data', out)

      return res.json(escapeObject(data._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    try {
      const db = req.app.db
      let data = await db.get('Data', id)
      res.json(escapeObject(data._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
