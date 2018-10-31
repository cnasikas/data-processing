'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Algorithms', [
      {
        id: 1,
        name: 'sum'
      },
      {
        id: 2,
        name: 'average'
      },
      {
        id: 3,
        name: 'count'
      },
      {
        id: 4,
        name: 'max'
      },
      {
        id: 5,
        name: 'median'
      },
      {
        id: 6,
        name: 'min'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Algorithms', null, {})
  }
}
