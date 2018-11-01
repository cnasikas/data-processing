class DataSetManager {
  constructor (handler, fm) {
    this.handler = handler
    this.fm = fm
    this.baseFolder = this.fm.baseFolder
  }

  download (location) {
    return this.handler.download(location)
  }

  upload (location) {
    return this.handler.upload(location)
  }
}

module.exports = DataSetManager
