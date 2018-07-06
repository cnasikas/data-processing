module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      gas: 100000000,
      network_id: '*' // Match any network id
    }
  }
}
