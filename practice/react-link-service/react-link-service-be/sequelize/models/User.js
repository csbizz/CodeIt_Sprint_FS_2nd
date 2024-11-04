const { DataTypes, Model } = require('sequelize');

class User extends Model {}

module.exports = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
};
