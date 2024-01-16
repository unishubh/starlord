module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define("subscriptions", {
    id: { type: DataTypes.UUID, primaryKey: true },
    userID: { type: DataTypes.UUID, allowNull: false },
    examID: { type: DataTypes.UUID, allowNull: false },
    planId: { type: DataTypes.UUID, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE }, allowNull: false,
    isExpired: { type: DataTypes.BOOLEAN },
  });
  subscriptions.associate = function (models) {
    // associations can be defined here
    subscriptions.belongsTo(models.user, { foreignKey: "userID" });
    subscriptions.belongsTo(models.exams, { foreignKey: "examID" });
    subscriptions.belongsTo(models.plans, { foreignKey: "planId" });
  };
  return subscriptions;
};
