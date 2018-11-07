const EventEmitter = require('events')
const logSymbols = require('log-symbols')

module.exports = class Listener extends EventEmitter {
  constructor (contract) {
    super()
    this.contract = contract
  }

  async registerToEvent (key) {
    try {
      console.log(logSymbols.info, `Starting ${key} listener`)
      const filter = this.contract[key]()
      filter.watch((error, result) => {
        console.log(logSymbols.info, `Received new ${key} event`)
        if (error) {
          if (error.message === 'filter not found') {
            console.log(logSymbols.warning, 'Withdrawal filter was deleted, recreating it...')
            filter.stopWatching()
            this.registerToEvent(key)
          } else {
            console.log(logSymbols.error, `Unknown error in ${key} filter!`)
            console.log(error.message)
          }
        }
        this.emit(key, result)
      })
    } catch (error) {
      console.log(error)
      throw new Error(`An error occured when trying to registered ${key} event`)
    }
  }
}
