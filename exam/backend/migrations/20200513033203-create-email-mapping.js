module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("email_mappings", {
      id: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("email_mappings");
  },
};
