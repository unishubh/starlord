module.exports = (sequelize, DataTypes) => {
    const plans = sequelize.define(
      "plans",
      {
        id: { type: DataTypes.UUID, primaryKey: true },
        name: {type:DataTypes.STRING, allowNull:false},
        pricing: {type:DataTypes.INTEGER, allowNull:false},
        duration: {type:DataTypes.INTEGER,allowNull:false},
        isEnable: {type:DataTypes.BOOLEAN, allowNull:false}
      },
    );
    return plans;
  };