'use strict';
module.exports = (sequelize, DataTypes) => {
  var Processor = sequelize.define('Processor', {
    name: DataTypes.STRING,
    pub_key: {
      type: DataTypes.STRING,
      unique: true
    },
    address_id: DataTypes.INTEGER
  }, {});
  Processor.associate = function(models) {
    // associations can be defined here
    Processor.belongsTo(models.Address, {foreignKey: 'address_id', targetKey: 'id'});
  };
  return Processor;
};
