var DataStore = artifacts.require("../contracts/DataStore.sol");
var DataDump = artifacts.require("../contracts/DataDump.sol");

module.exports = function(deployer) {
  deployer.deploy(DataStore);
  deployer.deploy(DataDump);
};
