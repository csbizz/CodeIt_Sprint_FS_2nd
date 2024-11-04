const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { setAuthCookies, removeAuthCookies } = require('../lib/auth');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  res.setAuthCookies = (userId) => setAuthCookies(res, userId);
  res.removeAuthCookies = () => removeAuthCookies(res);
  next();
});
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send('서버 에러가 발생했습니다.');
  }
  return next();
});
app.use(routes);

module.exports = app;
