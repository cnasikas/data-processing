const DataSetManager = require('./DataSetManager.js')
const { HTTPHandler } = require('./protocolHandlers')

const handlerFactory = (type = 'http', fileDirectory) => {
  switch (type) {
    case 'http':
    case 'ipfs':
    case 'ftp':
    case 'local':
    default:
      return new HTTPHandler(fileDirectory)
  }
}

module.exports = (type = 'http', fileDirectory = 'files') => {
  const handler = handlerFactory(type, fileDirectory)

  return new DataSetManager(handler)
}
