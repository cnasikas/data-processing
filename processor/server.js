import Web3 from 'web3'
import config from './config.json'
import contracts from '../api/services/Contracts.js'

const provider = 'http://' + config.networks.development.host + ':' + config.networks.development.port
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

contracts.request.contract.deployed().then(instance => {
  return instance.RequestProcess().watch((error, result) => {
    if (!error) {
      let reqAddr = result.args.reqAddr
      let dataAddr = result.args.dataAddr

      console.log('Processing request from ' + reqAddr + ' for data ' + dataAddr)
    }
  })
})
