
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Addresses', 'hash', 'address')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Addresses', 'address', 'hash')
  }
}
