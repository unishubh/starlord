'use strict';
module.exports = (sequelize, DataTypes) => {
  const exams = sequelize.define('exams', {
    name: DataTypes.STRING,
    agency_id: DataTypes.INTEGER,
    details: DataTypes.STRING,
    max_marks: DataTypes.STRING,
    avg_marks: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {});
  exams.associate = function(models) {
    // associations can be defined here
    exams.belongsTo(models.agency , {foreignKey:'agency_id'})
  };
  return exams;
};