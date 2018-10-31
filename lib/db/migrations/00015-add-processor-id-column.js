'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Requests',
      'processor_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'Processors',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Requests',
      'processor_id'
    )
  }
}
