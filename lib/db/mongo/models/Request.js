const mongoose = require('mongoose')
const schemes = require('../schemes/schemes')

const RequestModel = mongoose.model('Request', schemes['request'])

module.exports = RequestModel
