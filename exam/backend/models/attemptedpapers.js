'use strict';
module.exports = (sequelize, DataTypes) => {
  const attemptedPapers = sequelize.define('attemptedPapers', {
    id : {type: DataTypes.UUID, primaryKey: true},
    userID : {type: DataTypes.UUID, allowNull:false},
    paperID : {type: DataTypes.UUID, allowNull:false},
    startTime : {type: DataTypes.DATE , allowNull:false},
    finished : {type: DataTypes.INTEGER , allowNull:false},
  });
  attemptedPapers.associate = function(models) {
    // associations can be defined here
    attemptedPapers.belongsTo(models.user , {foreignKey:'userID'}) ;
    attemptedPapers.belongsTo(models.mockpapers , {foreignKey:'paperID'}) ;
  };
  return attemptedPapers;
}; 