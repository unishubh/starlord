'use strict';
module.exports = (sequelize, DataTypes) => {
  const mockpapers = sequelize.define('mockpapers', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    examId :{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    totalQns :{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    totalMarks :{
      //allowNull:false,
      type:DataTypes.INTEGER,
    },
    attemptedCount :{
      type:DataTypes.INTEGER,
    }
  });
  mockpapers.associate = function(models) {
    mockpapers.belongsTo(models.exams , {foreignKey:'examId'})
  };
  return mockpapers;
}; 