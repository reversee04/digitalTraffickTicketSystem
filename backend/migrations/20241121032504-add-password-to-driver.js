'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Drivers', 'password', {
      type: Sequelize.STRING,
      allowNull: false,  // Ensure the password field is not null
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Drivers', 'password');
  }
};
