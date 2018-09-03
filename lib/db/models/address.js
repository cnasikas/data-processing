'use strict'
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    user_id: DataTypes.INTEGER
  }, {})
  Address.associate = function (models) {
    // associations can be defined here
    Address.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id'});
    Address.hasMany(models.Dataset, {foreignKey: 'address_id', targetKey: 'id'});
    Address.hasMany(models.Request, {foreignKey: 'address_id', targetKey: 'id'});
    Address.hasMany(models.Processor, {foreignKey: 'address_id', targetKey: 'id'});
    Address.hasMany(models.Controller, {foreignKey: 'address_id', targetKey: 'id'});
  }
  return Address
}
