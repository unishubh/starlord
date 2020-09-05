module.exports = (sequelize, DataTypes) => {
  const exams = sequelize.define(
    "exams",
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: DataTypes.STRING,
      agencyID: DataTypes.UUID,
      details: DataTypes.STRING,
      max_marks: DataTypes.INTEGER,
      time: DataTypes.INTEGER,
      subjectID: DataTypes.UUID,
      categoryID: DataTypes.UUID,
    },
    {}
  );
  exams.associate = function (models) {
    // associations can be defined here
    exams.belongsTo(models.agency, { foreignKey: "agencyID" });
    exams.belongsTo(models.subjects, { foreignKey: "subjectID" });
    exams.belongsTo(models.categories, { foreignKey: "categoryID" });
  };
  return exams;
};
