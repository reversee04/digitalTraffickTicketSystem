'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    
    static associate(models) {
      // A driver can have many tickets
      Driver.hasMany(models.Ticket, {
        foreignKey: 'driverId', 
        as: 'tickets',         
        onDelete: 'CASCADE',   
      });

      // A driver can have many vehicles
      Driver.hasMany(models.Vehicle, {
        foreignKey: 'driverId', 
        as: 'vehicles',         
        onDelete: 'CASCADE',    
      });
    }
  }
  Driver.init(
    {
      name: DataTypes.STRING,
      licenseNumber: DataTypes.STRING,
      contactInfo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Driver',
    }
  );
  return Driver;
};
