const request = require('request')
const Handler = require('./Handler')

class HTTPHandler extends Handler {
  download (location) {
    return new Promise((resolve, reject) => {
      const inputStream = request(location)
      inputStream.on('response', async (response) => {
        let fileName = 'dataset.csv'

        if (response.headers['content-disposition']) {
          const regexp = /filename="(.*)"/gi
          fileName = regexp.exec(response.headers['content-disposition'])[1]
        }

        const filePath = await this.saveFile(inputStream, fileName)
        resolve(filePath)
      })
        .on('error', reject)
    })
  }

  upload (location) {}
}

module.exports = HTTPHandler
