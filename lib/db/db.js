const {
  Request,
  Dataset,
  Address,
  Algorithm,
  Controller,
  Processor,
  User
} = require('./models')

const { simpleSave, saveRequest, saveWithAddress } = require('./methods')

module.exports = {
  methods: {
    simpleSave,
    saveRequest,
    saveWithAddress
  },
  models:
  {
    Request,
    Dataset,
    Address,
    Algorithm,
    Controller,
    Processor,
    User
  },
  eventHandlers: require('./eventHandlers')
}
