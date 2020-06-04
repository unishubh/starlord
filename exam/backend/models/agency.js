'use strict';
module.exports = (sequelize, DataTypes) => {
  const agency = sequelize.define('agency', {
    agency_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  agency.associate = function(models) {
    // associations can be defined here
    agency.hasMany( models.exams , {foreignKey:'agency_id'}) ;
  };
  return agency;
}; 