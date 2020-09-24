module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("plans", {
      id: { type: Sequelize.UUID, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      pricing: { type: Sequelize.INTEGER, allowNull: false },
      duration: { type: Sequelize.INTEGER, allowNull: false },
      isEnable: { type: Sequelize.BOOLEAN, allowNull: false },
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
    return queryInterface.dropTable("plans");
  },
};