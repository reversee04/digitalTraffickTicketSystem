'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
   
    static associate(models) {
      // A vehicle belongs to a driver
      Vehicle.belongsTo(models.Driver, {
        foreignKey: 'driverId',
        as: 'driver',         
        onDelete: 'CASCADE',   
      });
    }
  }
  Vehicle.init(
    {
      licensePlate: DataTypes.STRING,
      model: DataTypes.STRING,
      color: DataTypes.STRING,
      driverId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Vehicle',
    }
  );
  return Vehicle;
};
