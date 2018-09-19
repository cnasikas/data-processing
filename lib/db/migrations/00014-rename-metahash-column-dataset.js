
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Datasets', 'meta_hash', 'metadata')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Datasets', 'metadata', 'meta_hash')
  }
}
