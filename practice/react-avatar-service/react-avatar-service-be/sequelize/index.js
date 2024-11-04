const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const applyExtraSetup = require('./extra-setup');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

fs.readdirSync(path.join(__dirname, './models')).forEach((file) => {
  const modelDefiner = require(path.join(__dirname, './models', file));
  modelDefiner(sequelize);
});

applyExtraSetup(sequelize);

module.exports = sequelize;
