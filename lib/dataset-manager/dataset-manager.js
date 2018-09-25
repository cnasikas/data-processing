const DataSetManager = require('./DataSetManager.js')
const { HTTPHandler } = require('./protocolHandlers')

module.exports = (type = 'http') => {
  let handler = ''
  switch (type) {
    case 'http':
    case 'ipfs':
    case 'ftp':
    case 'local':
    default:
      handler = new HTTPHandler()
  }

  return new DataSetManager(handler)
}
