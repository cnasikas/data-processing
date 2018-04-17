const mongoose = require('mongoose')
const schemes = require('../schemes/schemes')

const DataModel = mongoose.model('Data', schemes['data'])

module.exports = DataModel
