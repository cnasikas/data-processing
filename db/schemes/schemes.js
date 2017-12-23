import mongoose from 'mongoose'

const Schema = mongoose.Schema

const defaults = {
  created_at: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
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

export default {
  datastore,
  user,
  data,
  account
}
