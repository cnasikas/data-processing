'use strict'
module.exports = (sequelize, DataTypes) => {
  var Controller = sequelize.define('Controller', {
    name: DataTypes.STRING,
    pub_key: {
      type: DataTypes.STRING,
      unique: true
    },
    address_id: DataTypes.INTEGER,
    tx_id: {
      type: DataTypes.STRING,
      unique: true
    },
    status: DataTypes.STRING
  }, {})
  Controller.associate = function (models) {
    // associations can be defined here
    Controller.belongsTo(models.Address, { foreignKey: 'address_id', targetKey: 'id' })
  }
  return Controller
}
