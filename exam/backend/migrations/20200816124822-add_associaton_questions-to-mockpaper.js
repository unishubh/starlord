'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  //  await queryInterface.addConstraint('')
    let s = await queryInterface.getForeignKeyReferencesForTable(['questions']) ;
    console.log(s)
  },

  down: async (queryInterface, Sequelize) => {
    console.log("undone")
    //await queryInterface.removeConstraint('questions', 'custom_fkey_constraint_name')
  }
};
