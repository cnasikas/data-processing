'use strict'
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    hash: {
      type: DataTypes.STRING,
      unique: true
    },
    user_id: DataTypes.INTEGER
  }, {})
  Address.associate = function (models) {
    // associations can be defined here
    Address.belongsTo(models.User, {foreignKey: 'user_id', targetKey: 'id'});
  }
  return Address
}
