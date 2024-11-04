const app = require('./app');
const sequelize = require('./sequelize');
const { PORT } = require('./config');

(async () => {
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
