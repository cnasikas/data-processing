'use strict';
module.exports = (sequelize, DataTypes) => {
  var Dataset = sequelize.define('Dataset', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING,
    hash: DataTypes.STRING,
    tx_id: {
      type: DataTypes.STRING,
      unique: true
    },
    meta_hash: DataTypes.STRING,
    address_id: DataTypes.INTEGER
  }, {});
  Dataset.associate = function(models) {
    // associations can be defined here
    Dataset.belongsTo(models.Address, {foreignKey: 'address_id', targetKey: 'id'});
  };
  return Dataset;
};
