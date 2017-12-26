import mongoose from 'mongoose'

const Schema = mongoose.Schema

const defaults = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}

const datastore = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  data: [{ type: Schema.Types.ObjectId, ref: 'Data' }],
  ...defaults
})

const data = new Schema({
  hash_ptr: String,
  contract_address: String,
  tx: String,
  enc: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  ...defaults
})

const user = new Schema({
  username: String,
  password: String,
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  ...defaults
})

const account = new Schema({
  address: String,
  ...defaults
})

const contract = new Schema({
  id: String,
  title: String,
  desc: String,
  artifact: String,
  address: String,
  ...defaults
})

const request = new Schema({
  contract: { type: Schema.Types.ObjectId, ref: 'Contract' },
  tx: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  account: { type: Schema.Types.ObjectId, ref: 'Account' },
  data: { type: Schema.Types.ObjectId, ref: 'Data' },
  processed: Boolean,
  proof: Boolean,
  ...defaults
})

export default {
  datastore,
  user,
  data,
  account,
  contract,
  request
}
