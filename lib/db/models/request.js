'use strict';
module.exports = (sequelize, DataTypes) => {
  var Request = sequelize.define('Request', {
    dataset_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    tx_id: {
      type: DataTypes.STRING,
      unique: true
    },
    algorithm_id: DataTypes.INTEGER,
    processed: DataTypes.BOOLEAN,
    pub_key: DataTypes.STRING,
    status: DataTypes.STRING,
    blockchain_id: DataTypes.STRING
  }, {});
  Request.associate = function(models) {
    // associations can be defined here
    Request.belongsTo(models.Address, {foreignKey: 'address_id', targetKey: 'id'});
    Request.belongsTo(models.Dataset, {foreignKey: 'dataset_id', targetKey: 'id'});
    Request.belongsTo(models.Algorithm, {foreignKey: 'algorithm_id', targetKey: 'id'});
  };
  return Request;
};
