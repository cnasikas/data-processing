/* global artifacts */

var DataStore = artifacts.require('../contracts/DataStore.sol')
var Verifier = artifacts.require('../contracts/Verifier.sol')
var ProofStore = artifacts.require('../contracts/ProofStore.sol')

module.exports = function (deployer) {
  deployer.deploy(DataStore)
    .then((instance) => {
      deployer.deploy(ProofStore, DataStore.address)
    })
  deployer.deploy(Verifier)
}
