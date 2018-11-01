const fs = require('fs')
const path = require('path')
const util = require('util')

const access = util.promisify(fs.access)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const mkdir = util.promisify(fs.mkdir)
const copyFile = util.promisify(fs.copyFile)

class FileManager {
  constructor (baseFolder) {
    this.baseFolder = baseFolder
    this.fileExt = {
      enc: 'enc',
      dec: 'dec',
      proof: 'proof',
      sym: 'sym'
    }
    this.writeFile = writeFile
    this.readFile = readFile
    this.mkdir = mkdir
    this.copyFile = copyFile
  }

  getExtension (type = 'enc') {
    return this.fileExt[type]
  }

  getPath (...args) {
    return path.join(this.baseFolder, ...args)
  }

  async accessFile (path) {
    await access(path, fs.constants.F_OK)
  }

  async exists (path) {
    try {
      await this.accessFile(path)
      return true
    } catch (e) {
      return false
    }
  }
}

module.exports = FileManager
