'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Officers', 'password', {
      type: Sequelize.STRING,
      allowNull: false, // If you want to enforce a password for every officer
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Officers', 'password');
  }
};
