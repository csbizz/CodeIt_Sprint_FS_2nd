const { DataTypes, Model } = require('sequelize');

class Link extends Model {}

module.exports = (sequelize) => {
  Link.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      thumbUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Link',
    },
  );
};
