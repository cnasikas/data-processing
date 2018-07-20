'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                id: 1,
                firstName: 'Anonymous',
                lastName: 'Fox',
                email: 'anonymous@fox.com'
            },
            {
                id: 2,
                firstName: 'Christos',
                lastName: 'Nasikas',
                email: 'xristosnasikas@gmail.com'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
