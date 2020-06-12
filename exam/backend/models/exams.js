'use strict';
module.exports = (sequelize, DataTypes) => {
  const exams = sequelize.define('exams', {
    id : {type: DataTypes.UUID, primaryKey: true},
    name: DataTypes.STRING,
    agencyID: DataTypes.UUID,
    details: DataTypes.STRING,
    max_marks: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {});
  exams.associate = function(models) {
    // associations can be defined here
    exams.belongsTo(models.agency , {foreignKey:'agencyID'});
  };
  return exams;
};