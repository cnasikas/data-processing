module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      gas: 4000000,
      gasPrice: 50000000000,
      network_id: '*' // Match any network id
    },
    ropsten: {
      host: '127.0.0.1',
      port: '8545',
      network_id: 3,
      from: '0x6c93277650539ef27bf479bb9cf9f178d49d0a19',
      gas: 4000000,
      gasPrice: 50000000000
    }
  }
}
