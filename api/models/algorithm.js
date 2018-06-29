'use strict';
module.exports = (sequelize, DataTypes) => {
  var Algorithm = sequelize.define('Algorithm', {
    name: DataTypes.STRING
  }, {});
  Algorithm.associate = function(models) {
    // associations can be defined here
  };
  return Algorithm;
};