const { DataTypes, Model } = require('sequelize');

class OAuthProvider extends Model {}

module.exports = (sequelize) => {
  OAuthProvider.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      provider: {
        type: DataTypes.ENUM('google'),
        allowNull: false,
      },
      providerUserId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OAuthProvider',
    },
  );
};
