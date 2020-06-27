'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id :{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    agencyID :{
      type: DataTypes.UUID,
      allowNull: true
    },
    name: {
      type:DataTypes.STRING ,
      allowNull : false
    },
    email:{ 
      type:DataTypes.STRING ,
      allowNull : false
    },
    
    password:{
      type : DataTypes.STRING , 
      allowNull : false 
    },
    role:{
      type : DataTypes.INTEGER ,
      allowNull : false 
    },
  });
  user.associate = function(models) {
    user.belongsTo(models.agency , {foreignKey : {
        allowNull: true,
        name: 'agencyID',
      }})
  };
  return user;
};