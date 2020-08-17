'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let s = await queryInterface.getForeignKeysForTables(['mockpapers']) ;
    console.log(s)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
