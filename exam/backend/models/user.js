'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type:DataTypes.STRING ,
      allowNull : true 
    },
    email:{ 
      type:DataTypes.STRING ,
      allowNull : true
    },
    
    password:{
      type : DataTypes.STRING , 
      allowNull : true 
    },
    role:{
      type : DataTypes.INTEGER ,
      allowNull : true 
    },
    accessToken: DataTypes.STRING
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};