'use strict';
module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    id: {type : DataTypes.UUID , primaryKey : true , allowNull : false },
    resonse: {type : DataTypes.JSON  , allowNull : true },
    paperID: {type : DataTypes.UUID ,  allowNull : false }
  }, {});
  questions.associate = function(models) {
    // associations can be defined here
  };
  return questions;
};