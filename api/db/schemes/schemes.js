import mongoose from 'mongoose'

const Schema = mongoose.Schema

const defaults = {
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}

const data = new Schema({
  hash_ptr: String,
  contract_address: String,
  tx: String,
  enc: String,
  account: String,
  gasUsed: Number,
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

const account = new Schema({
  address: String,
  ...defaults
})

const request = new Schema({
  contract_address: String,
  tx: String,
  account: String,
  data: String,
  processed: Boolean,
  proof: Boolean,
  gasUsed: Number,
  ...defaults
})

export default {
  data,
  contract,
  request,
  account
}
