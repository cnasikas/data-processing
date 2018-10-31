const {
  Request,
  Dataset,
  Address,
  Algorithm,
  Controller,
  Processor,
  User
} = require('./models')

module.exports = {
  methods: require('./methods'),
  models:
  {
    Request,
    Dataset,
    Address,
    Algorithm,
    Controller,
    Processor,
    User
  },
  eventHandlers: require('./eventHandlers')
}
