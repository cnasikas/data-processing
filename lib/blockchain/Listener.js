const EventEmitter = require('events')

module.exports = class Listener extends EventEmitter {
  constructor (contract) {
    super()
    this.contract = contract
  }

  async registerToEvent (key) {
    try {
      const instance = await this.contract.deployed()
      instance[key]().watch((error, result) => {
        if (error) {
          console.log(error)
          throw new Error('Cannot watch event')
          if (error.message === 'filter not found') {
            console.log('[!] Withdrawal filter was deleted, recreating it...')
            filter.stopWatching()
            this.registerToEvent(key)
          } else {
            console.log(`[!] Unknown error in ${key} filter!`)
            console.log(error.message)
          }
        }
        this.emit(key, result)
      })
    } catch (error) {
      console.log(error)
      throw new Error('Cannot register to event')
    }
  }
}
