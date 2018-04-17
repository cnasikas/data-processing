const mongoose = require('mongoose')
const schemes = require('../schemes/schemes')

const ProcessorModel = mongoose.model('Processor', schemes['processor'])

module.exports = ProcessorModel
