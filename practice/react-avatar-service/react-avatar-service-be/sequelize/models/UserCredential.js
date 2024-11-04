const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class UserCredential extends Model {
  verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = (sequelize) => {
  UserCredential.init(
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
      password: {
        type: DataTypes.STRING,
        set(value) {
          const hashed = bcrypt.hashSync(value, 5);
          this.setDataValue('password', hashed);
        },
      },
    },
    {
      sequelize,
      modelName: 'UserCredential',
    }
  );
};
