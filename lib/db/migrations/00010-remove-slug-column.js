'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Datasets',
      'slug'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Datasets',
      'slug',
      Sequelize.STRING
    );
  }
};
