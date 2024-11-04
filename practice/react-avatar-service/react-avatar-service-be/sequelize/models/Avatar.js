const { DataTypes, Model } = require('sequelize');

const AVATAR_PROPERTIES = {
  hairType: ['none', 'short1', 'short2', 'short3', 'long1', 'long2', 'long3'],
  hairColor: ['black', 'brown', 'blonde'],
  skin: ['tone100', 'tone200', 'tone300', 'tone400'],
  clothes: [
    'tshirtBasic',
    'tshirtPrinted',
    'hoodie',
    'knitVest',
    'jacketLeather',
    'dressFormal',
    'collarBasic',
    'knitLayered',
  ],
  accessories: ['none', 'headset', 'earbuds', 'earings', 'nametag', 'ballcap'],
};

class Avatar extends Model {}

module.exports = (sequelize) => {
  Avatar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      hairType: {
        type: DataTypes.ENUM(AVATAR_PROPERTIES.hairType),
        defaultValue: AVATAR_PROPERTIES.hairType[0],
        allowNull: false,
      },
      hairColor: {
        type: DataTypes.ENUM(AVATAR_PROPERTIES.hairColor),
        defaultValue: AVATAR_PROPERTIES.hairColor[0],
        allowNull: false,
      },
      skin: {
        type: DataTypes.ENUM(AVATAR_PROPERTIES.skin),
        defaultValue: AVATAR_PROPERTIES.skin[0],
        allowNull: false,
      },
      clothes: {
        type: DataTypes.ENUM(AVATAR_PROPERTIES.clothes),
        defaultValue: AVATAR_PROPERTIES.clothes[0],
        allowNull: false,
      },
      accessories: {
        type: DataTypes.ENUM(AVATAR_PROPERTIES.accessories),
        defaultValue: AVATAR_PROPERTIES.accessories[0],
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Avatar',
    },
  );
};
