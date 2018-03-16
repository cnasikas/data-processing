import _ from 'lodash'
import BaseController from './BaseController'
import Data from '../db/models/Data'
import Crypto from 'total-crypto'
import {escapeObject, slugify} from 'data-market-utils'

export default class DataController extends BaseController {
  constructor (blockchain) {
    super(Data, '_id', blockchain)
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
    // the keys are checked for existence at bootstrap
    this.crypto = new Crypto()
  }

  async create (req, res) {
    /* TODO: Hanlde null values on post */
    let account = this.node.getDefaultAccount()
    let location = req.body.location || ''
    location = req.sanitize(location)

    if (_.isEmpty(location)) {
      return res.status(500).json({error: 'Empty location is not allowed'})
    }

    let name = req.sanitize(req.body.name)
    let slug = slugify(name)
    let category = req.sanitize(req.body.category)
    let hash = this.crypto.hash([name, location, category, account])

    try {
      let instance = await this.contracts.datastore.contract.deployed()
      let result = await instance.registerDataSet(this.node.toBytes(slug), location, name, category, hash, account, {from: account, gas: 500000})

      let out = {
        slug,
        name,
        location,
        category,
        hash,
        contract_address: this.contracts.datastore.contract.address,
        tx: result.tx,
        account,
        gasUsed: result.receipt.gasUsed
      }

      let data = await new Data(out).save()

      return res.json(escapeObject(data._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    try {
      let data = await Data.findById(id)
      res.json(escapeObject(data._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
