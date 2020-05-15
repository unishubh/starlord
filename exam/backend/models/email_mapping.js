'use strict';
module.exports = (sequelize, DataTypes) => {
  const email_mapping = sequelize.define('email_mapping', {
    email: {
      type:DataTypes.STRING ,
      primaryKey:true
    }, 
    id:DataTypes.STRING 
    });
  return email_mapping;
};