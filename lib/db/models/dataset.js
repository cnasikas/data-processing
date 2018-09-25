'use strict'
module.exports = (sequelize, DataTypes) => {
  var Dataset = sequelize.define('Dataset', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING,
    hash: DataTypes.STRING,
    tx_id: {
      type: DataTypes.STRING,
      unique: true
    },
    metadata: DataTypes.STRING,
    address_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {})
  Dataset.associate = function (models) {
    // associations can be defined here
    Dataset.belongsTo(models.Address, { foreignKey: 'address_id', targetKey: 'id' })
  }
  return Dataset
}
