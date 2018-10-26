class DataSetManager {
  constructor (handler) {
    this.handler = handler
  }

  download (location) {
    return this.handler.download(location)
  }

  upload (location) {
    return this.handler.upload(location)
  }
}

module.exports = DataSetManager
