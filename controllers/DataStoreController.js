import _ from 'lodash'
import BaseController from './BaseController'
import Data from '../db/models/Data'
import ContractService from '../services/Contracts.js'
import Crypto from '../services/Crypto.js'
import node from '../services/Node.js'

export default class DataController extends BaseController {
  constructor () {
    super(Data, '_id')
    this.contracts = new ContractService().getContracts()
    // the keys are checked for existence at bootstrap
    this.crypto = new Crypto(process.env.SYM_KEY, process.env.HMAC_KEY)
  }

  list (req, res) {
    return Data.find().limit(10).sort({created_at: 'desc'})
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }

  async create (req, res) {
    /* TODO: Hanlde null values on post */
    let account = node.getDefaultAccount()
    let hashPointer = req.body.hash_pointer || ''

    if (_.isEmpty(hashPointer)) {
      return res.status(500).json({error: 'Empty hash pointer is not allowed'})
    }

    try {
      let encKey = await this.crypto.encryptKey()
      let instance = await this.contracts.datastore.contract.deployed()
      let result = await instance.publishData(account, hashPointer)

      let o = {
        hash_ptr: hashPointer,
        contract_address: this.contracts.datastore.contract.address,
        tx: result.tx,
        enc: encKey,
        account,
        gasUsed: result.receipt.gasUsed
      }

      let data = await new Data(o).save()

      return res.json(data)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  read (req, res, id) {
    Data.findById(id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }
}
