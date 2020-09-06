module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.addColumn("exams", "subjectID", {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "subjects",
          key: "id",
        },
      });

      await queryInterface.addColumn("exams", "categoryID", {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
      await queryInterface.removeColumn("exams", "subjectID");

      await queryInterface.removeColumn("exams", "categoryID");
    } catch (e) {
      console.log(e);
    }
  },
};
