'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Violation extends Model {
    
    static associate(models) {
      // A violation can be associated with multiple tickets
      Violation.hasMany(models.Ticket, {
        foreignKey: 'violationId', 
        as: 'tickets',            
        onDelete: 'CASCADE',      
      });
    }
  }
  Violation.init(
    {
      description: DataTypes.STRING,
      fineAmount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Violation',
    }
  );
  return Violation;
};
