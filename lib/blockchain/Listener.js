const EventEmitter = require('events')

module.exports = class Listener extends EventEmitter {
  constructor (contract) {
    super()
    this.contract = contract
  }

  async registerToEvent (key) {
    try {
      console.log(`[*] Starting ${key} listener`)
      const filter = this.contract[key]()
      filter.watch((error, result) => {
        console.log(`[*] Received new ${key} event`)
        if (error) {
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
      throw new Error(`[*] An error occured when trying to registered ${key} event`)
    }
  }
}
