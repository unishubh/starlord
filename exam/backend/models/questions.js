'use strict';
module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    id: {type : DataTypes.UUID ,  allowNull : false , primaryKey:true},
    iid: {type : DataTypes.INTEGER ,  allowNull : false },
    qnJSON: {type : DataTypes.JSON  , allowNull : true },
    paperID: {type : DataTypes.UUID ,  allowNull : false }
  }, {});
  questions.associate = function(models) {
    // associations can be defined here
  };
  return questions;
};