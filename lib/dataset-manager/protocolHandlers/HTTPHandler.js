const request = require('request')
const Handler = require('./Handler')

const { STATUS_CODES } = require('http')

const httpCodeToName = (code) => {
  const suffix = (code / 100 | 0) === 4 || (code / 100 | 0) === 5 ? 'Error' : ''
  return `${STATUS_CODES[code].replace(/\s|error/igm, '')}${suffix}`
}

class HTTPError extends Error {
  constructor (code, message) {
    super(message || STATUS_CODES[code])
    this.name = httpCodeToName(code)
    this.statusCode = code
  }
}

class HTTPHandler extends Handler {
  download (location) {
    return new Promise((resolve, reject) => {
      const inputStream = request(location)
      inputStream.on('response', async (response) => {
        if ((response.statusCode / 100 | 0) === 4 || (response.statusCode / 100 | 0) === 5) {
          return reject(new HTTPError(response.statusCode))
        }

        let fileName = 'dataset.csv'

        if (response.headers['content-disposition']) {
          const regexp = /filename="(.*)"/gi
          fileName = regexp.exec(response.headers['content-disposition'])[1]
        }

        try {
          const filePath = await this.saveFile(inputStream, fileName)
          return resolve(filePath)
        } catch (err) {
          return reject(err)
        }
      })
        .on('error', reject)
    })
  }

  upload (location) {}
}

module.exports = HTTPHandler
