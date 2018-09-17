class DataSetManager {
  constructor (ProtocolHandler) {
    this.prHandler = ProtocolHandler
  }

  download (location) {
    return this.prHandler.download(location)
  }

  upload (location) {
    return this.prHandler.upload(location)
  }
}

module.exports = DataSetManager
