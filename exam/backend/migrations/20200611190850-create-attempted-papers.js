module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("attemptedPapers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userID: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      paperID: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      startTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      finished: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("attemptedPapers");
  },
};
