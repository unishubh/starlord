module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("userPaperResponses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userID: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      paperID: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      response: {
        allowNull: false,
        type: Sequelize.JSON,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("userPaperResponses");
  },
};
