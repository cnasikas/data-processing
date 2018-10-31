module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Addresses', [
      {
        id: 1,
        address: '0x0deD0E1cea8b62eb073BA285a8b8e199122E4509',
        user_id: 1
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Addresses', null, {})
  }
}
