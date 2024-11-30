'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100), // Ensure max length is within limits
        allowNull: false,
      },
      licenseNumber: {
        type: Sequelize.STRING(100), // Ensure max length is within limits
        unique: false,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255), // Ensure max length is within limits
        unique: false,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(15), // Use appropriate length for phone numbers (e.g., 15)
        allowNull: true,
        unique: false,
      },
      password: {
        type: Sequelize.STRING(255), // Ensure max length is within limits
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Drivers');
  },
};
