const fs = require('fs')
const path = require('path')

class Handler {
  constructor () {
    if (new.target === Handler) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }

    this.uploadFolder = '../../uploads'
  }

  download (location) {
    throw new Error('download: Implementation Missing!')
  }

  upload (location) {
    throw new Error('upload: Implementation Missing!')
  }

  saveFile (stream, fileName = 'dataset.csv') {
    const filePath = path.join(this.uploadFolder, fileName)
    const fileStream = stream.pipe(fs.createWriteStream(filePath))

    return new Promise((resolve, reject) => {
      fileStream.on('finish', () => {
        resolve(fileStream.path)
      })

      fileStream.on('error', reject)
    })
  }
}

module.exports = Handler
