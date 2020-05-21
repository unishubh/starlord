'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userID :{
      type: DataTypes.STRING,
      allowNull: false
    },
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
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};