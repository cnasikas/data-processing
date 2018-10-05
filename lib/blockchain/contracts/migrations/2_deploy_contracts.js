/* global artifacts */

var DataStore = artifacts.require('../contracts/DataStore.sol')

module.exports = function (deployer) {
  deployer.deploy(DataStore)
}
