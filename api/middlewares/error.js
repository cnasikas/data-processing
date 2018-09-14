const { HTTPError } = require('../errors')

const HTTPErrorHandler = (err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.statusCode).json({
      success: false,
      msg: err.message
    })
  }
  next(err)
}

const FileErrorHandler = (err, req, res, next) => {
  if (err.code && err.code === 'ENOENT') {
    return res.status(err.statusCode).json({
      error: true,
      msg: 'File not found'
    })
  }

  next(err)
}

module.exports = {
  HTTPErrorHandler,
  FileErrorHandler
}
