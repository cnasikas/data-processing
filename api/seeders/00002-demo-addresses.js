'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Addresses', [
            {
                id: 1,
                address: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
                user_id: 1,
            },
            {
                id: 2,
                address: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
                user_id: 1,
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Addresses', null, {});
    }
};
