'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Requests',
      'blockchain_id',
      Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Requests',
      'blockchain_id'
    );
  }
};
