const { handleDataset } = require('./dataset')
const { handleEntity, handleController, handleProcessor } = require('./entity')
const { handleRequest } = require('./request')
const { handleProcess } = require('./process')
const { handleProof } = require('./proof')

module.exports = {
  handleDataset,
  handleEntity,
  handleRequest,
  handleProcess,
  handleProof,
  handleController,
  handleProcessor
}
