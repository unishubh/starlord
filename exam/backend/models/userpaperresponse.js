module.exports = (sequelize, DataTypes) => {
  const userPaperResponse = sequelize.define(
    "userPaperResponse",
    {
      id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
      userID: { type: DataTypes.UUID, allowNull: false },
      paperID: { type: DataTypes.UUID, allowNull: false },
      response: { type: DataTypes.JSON, allowNull: true },
    },
    {}
  );
  userPaperResponse.associate = function (models) {
    // associations can be defined here
  };
  return userPaperResponse;
};
