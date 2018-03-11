import mongoose from 'mongoose'

const Schema = mongoose.Schema

const defaults = {
  contract_address: String,
  tx: String,
  account: String,
  gasUsed: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}

const data = new Schema({
  slug: String,
  name: String,
  location: String,
  category: String,
  hash: String,
  ...defaults
})

const provider = new Schema({
  name: String,
  address: String,
  pubKey: String,
  ...defaults
})

const processor = new Schema({
  name: String,
  address: String,
  pubKey: String,
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
  provider: String,
  processed: Boolean,
  proof: Boolean,
  gasUsed: Number,
  ...defaults
})

export default {
  data,
  contract,
  request,
  account,
  provider,
  processor
}
