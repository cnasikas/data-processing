module.exports = class DB {
  constructor () {
    if (new.target === DB) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }
  }

  connect () {
    throw new Error('connect: Implementation Missing!')
  }

  isConnected () {
    throw new Error('isConnected: Implementation Missing!')
  }
}
