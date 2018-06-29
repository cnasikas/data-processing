'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Datasets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      hash: {
        type: Sequelize.STRING
      },
      tx_id: {
        type: Sequelize.STRING
      },
      meta_hash: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Datasets')
  }
}
