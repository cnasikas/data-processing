'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    let migrations = []
    migrations.push(queryInterface.addColumn(
      'Processors',
      'status',
      Sequelize.STRING
    ))
    migrations.push(queryInterface.addColumn(
      'Processors',
      'tx_id',
      Sequelize.STRING
    ))
    migrations.push(queryInterface.addColumn(
      'Controllers',
      'status',
      Sequelize.STRING
    ))
    migrations.push(queryInterface.addColumn(
      'Controllers',
      'tx_id',
      Sequelize.STRING
    ))
    return Promise.all(migrations)
  },

  down: (queryInterface, Sequelize) => {
    let migrations = []
    migrations.push(queryInterface.removeColumn(
      'Processors',
      'status'
    ))
    migrations.push(queryInterface.removeColumn(
      'Processors',
      'tx_id'
    ))
    migrations.push(queryInterface.removeColumn(
      'Controllers',
      'status'
    ))
    migrations.push(queryInterface.removeColumn(
      'Controllers',
      'tx_id'
    ))
    return Promise.all(migrations)
  }
};
