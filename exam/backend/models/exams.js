'use strict';
module.exports = (sequelize, DataTypes) => {
  const exams = sequelize.define('exams', {
    name: DataTypes.STRING,
    agencyId: DataTypes.INTEGER,
    details: DataTypes.STRING,
    max_marks: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {});
  exams.associate = function(models) {
    // associations can be defined here
    exams.belongsTo(models.agency , {foreignKey:'agencyId'});
  };
  return exams;
};