module.exports = (sequelize, DataTypes) => {
  const mockpapers = sequelize.define("mockpapers", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    examID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalQns: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalMarks: {
      // allowNull:false,
      type: DataTypes.INTEGER,
    },
    attemptedCount: {
      type: DataTypes.INTEGER,
    },
  });
  mockpapers.associate = function (models) {
    mockpapers.belongsTo(models.exams, { foreignKey: "examID" });
  };
  return mockpapers;
};
