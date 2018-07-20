'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      const dateField = {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('NOW()'),
      };

      return queryInterface.changeColumn('Algorithms', 'createdAt', dateField)
        .then(() => queryInterface.changeColumn('Algorithms', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Addresses', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Addresses', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Controllers', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Controllers', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Datasets', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Datasets', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Processors', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Processors', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Requests', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Requests', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Users', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Users', 'updatedAt', dateField))
  },
  down: (queryInterface, Sequelize) => {
      const dateField = {
          allowNull: false,
          type: Sequelize.DATE,
      };

      return queryInterface.changeColumn('Algorithms', 'createdAt', dateField)
        .then(() => queryInterface.changeColumn('Algorithms', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Addresses', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Addresses', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Controllers', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Controllers', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Datasets', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Datasets', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Processors', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Processors', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Requests', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Requests', 'updatedAt', dateField))
        .then(() => queryInterface.changeColumn('Users', 'createdAt', dateField))
        .then(() => queryInterface.changeColumn('Users', 'updatedAt', dateField))
    }
};
