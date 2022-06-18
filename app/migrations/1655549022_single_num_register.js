const SingleNumRegister = artifacts.require("SingleNumRegister");

module.exports = function(_deployer) {
  _deployer.deploy(SingleNumRegister);
};
