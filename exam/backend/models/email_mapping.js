'use strict';
module.exports = (sequelize, DataTypes) => {
  const email_mapping = sequelize.define('email_mapping', {
    email: {
      type:DataTypes.STRING ,
      primaryKey:true
    }, 
    id:DataTypes.STRING 
    });
  email_mapping.associate = function(models) {
    // associations can be defined here
  };
  return email_mapping;
};