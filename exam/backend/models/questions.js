'use strict';
module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    paperID: DataTypes.STRING,
    questions: DataTypes.JSON
  }, {});
  questions.associate = function(models) {
    // associations can be defined here
  };
  return questions;
};