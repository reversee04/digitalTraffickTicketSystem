'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Officer extends Model {
    
    static associate(models) {
      // An officer can issue many tickets
      Officer.hasMany(models.Ticket, {
        foreignKey: 'officerId', 
        as: 'tickets',         
        onDelete: 'SET NULL',   
      });
    }
  }
  Officer.init(
    {
      name: DataTypes.STRING,
      badgeNumber: DataTypes.STRING,
      department: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Officer',
    }
  );
  return Officer;
};
