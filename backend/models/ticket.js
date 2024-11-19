'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    
    static associate(models) {
      // A ticket belongs to a driver
      Ticket.belongsTo(models.Driver, {
        foreignKey: 'driverId',
        as: 'driver',
        onDelete: 'CASCADE',
      });

      // A ticket belongs to an officer
      Ticket.belongsTo(models.Officer, {
        foreignKey: 'officerId',
        as: 'officer',
        onDelete: 'SET NULL',
      });

      // A ticket belongs to a violation
      Ticket.belongsTo(models.Violation, {
        foreignKey: 'violationId',
        as: 'violation',
        onDelete: 'CASCADE',
      });

      // A ticket has one payment
      Ticket.hasOne(models.Payment, {
        foreignKey: 'ticketId', 
        as: 'payment',         
        onDelete: 'CASCADE',   
      });
    }
  }
  Ticket.init(
    {
      date: DataTypes.DATE,
      status: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
      officerId: DataTypes.INTEGER,
      driverId: DataTypes.INTEGER,
      violationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Ticket',
    }
  );
  return Ticket;
};
