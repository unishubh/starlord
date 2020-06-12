'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mockpapers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type:Sequelize.STRING,
        allowNull:false
      },
      examID :{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      totalQns :{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      totalMarks :{
        type:Sequelize.INTEGER,
        //allowNull:false
      },
      attemptedCount :{
        type:Sequelize.INTEGER,
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
    return queryInterface.dropTable('mockpapers');
  }
};