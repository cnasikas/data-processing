import _ from 'lodash'
import BaseController from './BaseController'
import Data from '../db/models/Data'
import blockchain from 'blockchain'
import Crypto from 'total-crypto'

export default class DataController extends BaseController {
  constructor () {
    super(Data, '_id')
    this.blockchain = blockchain()
    this.node = this.blockchain.node
    this.contracts = new this.blockchain.ContractService().getContracts()
    // the keys are checked for existence at bootstrap
    this.crypto = new Crypto()
  }

  slugify (string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  async list (req, res) {
    try {
      let data = await Data.find().limit(10).sort({created_at: 'desc'})
      res.json(data)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async create (req, res) {
    /* TODO: Hanlde null values on post */
    let account = this.node.getDefaultAccount()
    let location = req.body.location || ''

    if (_.isEmpty(location)) {
      return res.status(500).json({error: 'Empty location is not allowed'})
    }

    let name = req.body.name
    let slug = this.slugify(name).toString('ascii')
    let category = req.body.category
    let hash = this.crypto.hash([name, location, category, account])

    try {
      // let encKey = this.crypto.pubEncrypt(process.env.PR_PUB_KEY, process.env.SYM_KEY)
      // let {iv, kemtag, ct} = JSON.parse(encKey)
      // encKey = JSON.stringify({iv, kemtag, ct})
      let instance = await this.contracts.datastore.contract.deployed()
      let result = await instance.registerDataSet(this.node.toBytes(slug), location, name, category, hash, account, {from: account, gas: 500000})

      let o = {
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

      let data = await new Data(o).save()

      return res.json(data)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    try {
      let data = await Data.findById(id)
      res.json(data)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
