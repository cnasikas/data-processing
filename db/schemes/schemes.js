import mongoose from 'mongoose'

const Schema = mongoose.Schema

const defaults = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}

const datastore = new Schema({
  user: Schema.Types.ObjectId,
  data: [Schema.Types.ObjectId],
  ...defaults
})

const data = new Schema({
  hash_ptr: String,
  contract_address: String,
  tx: String,
  enc: String,
  user: Schema.Types.ObjectId,
  ...defaults
})

const user = new Schema({
  username: String,
  password: String,
  accounts: [Schema.Types.ObjectId],
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
  contract: Schema.Types.ObjectId,
  tx: String,
  user: Schema.Types.ObjectId,
  account: Schema.Types.ObjectId,
  data: Schema.Types.ObjectId,
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
