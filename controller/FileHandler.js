import fs from 'fs'
import path from 'path'
import util from 'util'

const access = util.promisify(fs.access)

class FileHandler {
  constructor (fileFolder) {
    this.fileFolder = fileFolder
    this.fileType = 'enc'
  }

  getFileWithExt (hash) {
    return `${hash}.${this.fileType}`
  }

  getFilePath (hash) {
    return path.join(this.fileFolder, hash, this.getFileWithExt(hash))
  }

  async accessFile (hash) {
    await access(this.getFilePath(hash), fs.constants.F_OK)
  }
}

module.exports = FileHandler
