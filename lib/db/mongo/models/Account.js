const mongoose = require('mongoose')
const schemes = require('../schemes/schemes')

const AccountModel = mongoose.model('Account', schemes['account'])

module.exports = AccountModel
