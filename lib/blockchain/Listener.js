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
        }
        this.emit(key, result)
      })
    } catch (error) {
      console.log(error)
      throw new Error('Cannot register to event')
    }
  }
}
