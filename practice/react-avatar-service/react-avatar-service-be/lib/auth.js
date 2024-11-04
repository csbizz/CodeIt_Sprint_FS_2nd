const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');
const { User } = sequelize.models;
const {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
  JWT_SECRET,
} = require('../config');

const COOKIE_OPTIONS = {
  sameSite: 'Strict',
  secure: false,
  httpOnly: true,
};

const ACCESS_TOKEN_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  path: '/api',
};

const REFRESH_TOKEN_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  path: '/api/auth',
};

function verifyToken(token) {
  try {
    const { sub } = jwt.verify(token, JWT_SECRET);
    return sub;
  } catch {
    return null;
  }
}

function createAccessToken(userId) {
  const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

function createRefreshToken(userId) {
  const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7 days' });
  return token;
}

async function authenticate(req, res, next) {
  const accessToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];
  if (!accessToken || typeof accessToken !== 'string') {
    return res.status(401).send();
  }
  const sub = verifyToken(accessToken);
  if (!sub) {
    return res.status(401).send();
  }

  const user = await User.findOne({ where: { id: sub } });
  if (!user) {
    return res.status(401).send();
  }

  req.user = user;
  return next();
}

async function authenticateWithRefreshToken(req, res, next) {
  const refreshToken = req.cookies[COOKIE_KEY_REFRESH_TOKEN];
  if (!refreshToken || typeof refreshToken !== 'string') {
    return res.status(401).send();
  }
  const sub = verifyToken(refreshToken);
  if (!sub) {
    return res.status(401).send();
  }

  const user = await User.findOne({ where: { id: sub } });
  if (!user) {
    return res.status(401).send();
  }

  req.user = user;
  return next();
}

function setAuthCookies(res, userId) {
  const accessToken = createAccessToken(userId);
  const refreshToken = createRefreshToken(userId);
  res
    .cookie(COOKIE_KEY_ACCESS_TOKEN, accessToken, ACCESS_TOKEN_COOKIE_OPTIONS)
    .cookie(
      COOKIE_KEY_REFRESH_TOKEN,
      refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS,
    );
  return res;
}

function removeAuthCookies(res) {
  res
    .cookie(COOKIE_KEY_ACCESS_TOKEN, '', {
      ...ACCESS_TOKEN_COOKIE_OPTIONS,
      expires: new Date(0),
    })
    .cookie(COOKIE_KEY_REFRESH_TOKEN, '', {
      ...REFRESH_TOKEN_COOKIE_OPTIONS,
      expires: new Date(0),
    });
  return res;
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  authenticate,
  authenticateWithRefreshToken,
  setAuthCookies,
  removeAuthCookies,
};
