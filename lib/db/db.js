const {
  Request,
  Dataset,
  Address,
  Algorithm,
  Controller,
  Processor,
  User
} = require('./models')

const { handleEntity, handleDataset, handleRequest } = require('./eventHandlers')
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
  eventHandlers: { handleEntity, handleDataset, handleRequest }
}
