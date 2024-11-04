module.exports = (sequelize) => {
  const { User, UserCredential, OAuthProvider, Link } = sequelize.models;

  User.hasOne(UserCredential, { onDelete: 'CASCADE', foreignKey: 'userId' });
  UserCredential.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(OAuthProvider, { onDelete: 'CASCADE', foreignKey: 'userId' });
  OAuthProvider.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(Link, { onDelete: 'CASCADE', foreignKey: 'userId' });
  Link.belongsTo(User, { foreignKey: 'userId' });
};
