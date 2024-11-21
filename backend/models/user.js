'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Define associations for the User model.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
      // Define associations if any
      // For example:
      // User.hasMany(models.SomeModel, { foreignKey: 'userId', as: 'someModels' });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true, // Ensure the username is not empty
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ensure the email is in the correct format
        },
      },
      role: {
        type: DataTypes.ENUM('TRAFFIC_OFFICER', 'ADMIN', 'DRIVER'),
        allowNull: false,
      },
    },
    {
      sequelize, // Pass the sequelize instance
      modelName: 'User', // Define the model name
    }
  );

  return User;
};
