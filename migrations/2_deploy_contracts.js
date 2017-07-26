var MetaData = artifacts.require("../contracts/MetaData.sol");

module.exports = function(deployer) {
  deployer.deploy(MetaData);
};
