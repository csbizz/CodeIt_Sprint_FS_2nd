module.exports = (sequelize) => {
  const { User, UserCredential, OAuthProvider, Avatar } = sequelize.models;

  User.hasOne(UserCredential, { onDelete: 'CASCADE', foreignKey: 'userId' });
  UserCredential.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(OAuthProvider, { onDelete: 'CASCADE', foreignKey: 'userId' });
  OAuthProvider.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(Avatar, { onDelete: 'CASCADE', foreignKey: 'userId' });
  Avatar.belongsTo(User, { foreignKey: 'userId' });
};
