var DataStore = artifacts.require('../contracts/DataStore.sol')
var DataDump = artifacts.require('../contracts/DataDump.sol')
var Requests = artifacts.require('../contracts/Requests.sol')

module.exports = function (deployer) {
  deployer.deploy(DataStore)
  deployer.deploy(DataDump)
  deployer.deploy(Requests)
}
