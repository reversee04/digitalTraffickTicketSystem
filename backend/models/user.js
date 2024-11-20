const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Assuming you have set up your Sequelize instance.

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('TRAFFIC_OFFICER', 'ADMIN', 'DRIVER'),
    allowNull: false,
  },
});

module.exports = User;
