'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id:{
        allowNull: false,
        primaryKey:true,
        type: Sequelize.UUID
      },
      iid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.UUID
      },
      paperID: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('questions');
  }
};