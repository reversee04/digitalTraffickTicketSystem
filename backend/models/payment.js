'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    
    static associate(models) {
      // A payment belongs to a ticket
      Payment.belongsTo(models.Ticket, {
        foreignKey: 'ticketId', 
        as: 'ticket',          
        onDelete: 'CASCADE',   
      });
    }
  }
  Payment.init(
    {
      amount: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      ticketId: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Payment',
    }
  );
  return Payment;
};
