const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categories.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      count: DataTypes.INTEGER,
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "categories",
    }
  );
  return categories;
};
