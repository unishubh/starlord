'use strict';
module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define('subscriptions', {
    id : {type: DataTypes.UUID, primaryKey: true},
    userID : {type: DataTypes.UUID, allowNull:false},
    examID : {type: DataTypes.UUID, allowNull:false}
  });
  subscriptions.associate = function(models) {
    // associations can be defined here
    subscriptions.belongsTo(models.user , {foreignKey:'userID'}) ;
    subscriptions.belongsTo(models.exams , {foreignKey:'examID'}) ;
  };
  return subscriptions;
};