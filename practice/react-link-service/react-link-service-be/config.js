const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const {
  COOKIE_KEY_ACCESS_TOKEN = 'access-token',
  COOKIE_KEY_REFRESH_TOKEN = 'refresh-token',
  JWT_SECRET = '$3CuR!7y',
  PORT = 3001,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL = `http://localhost:3000`,
  STATIC_URL = `http://localhost:3001`,
} = process.env;

const STATIC_FILE_PATH = path.join(__dirname, './static');

module.exports = {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
  JWT_SECRET,
  PORT,
  STATIC_FILE_PATH,
  STATIC_URL,
  BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};
