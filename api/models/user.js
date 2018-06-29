'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING
    }, {});
    User.associate = function(models) {
        // associations can be defined here
        User.hasMany(models.Address, {foreignKey: 'user_id', sourceKey: 'id'});
    };
    return User;
};
