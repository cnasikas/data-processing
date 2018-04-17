const mongoose = require('mongoose')
const schemes = require('../schemes/schemes')

const AccountModel = mongoose.model('Contract', schemes['contract'])

module.exports = AccountModel
