export default class FordwardService {
  constructor (listener) {
    this.listener = listener
    this.registerToEvents()
  }

  forwardToProcessor (data) {
    console.log(data)
  }

  registerToEvents () {
    this.listener.on('request', (req) => {
      this.forwardToProcessor({...req.args})
    })
  }
}
