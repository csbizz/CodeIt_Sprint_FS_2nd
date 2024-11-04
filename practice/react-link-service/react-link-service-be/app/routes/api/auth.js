const express = require('express');
const {
  authenticate,
  authenticateWithRefreshToken,
} = require('../../../lib/auth');
const sequelize = require('../../../sequelize');
const google = require('../../../lib/google');
const { User, UserCredential, OAuthProvider } = sequelize.models;

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send();
  }
  const credential = await UserCredential.findOne({
    where: { userId: user.id },
  });
  const isValid = await credential?.verifyPassword(password);
  if (!isValid) {
    return res.status(401).send();
  }

  const userId = user.id.toString();
  return res.setAuthCookies(userId).status(200).send();
});

router.delete('/logout', authenticate, (req, res) => {
  return res.removeAuthCookies().status(200).send();
});

router.post('/token/refresh', authenticateWithRefreshToken, (req, res) => {
  const userId = req.user.id.toString();
  return res.setAuthCookies(userId).send(200).send();
});

router.get('/google', async (req, res) => {
  const authUrl = google.generateAuthUrl();
  return res.status(302).redirect(authUrl);
});

router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send();

  let userInfo;
  try {
    const tokens = await google.getTokens(code);
    userInfo = await google.getUserInfoFromIdToken(tokens.id_token);
  } catch {
    return res.status(401).send();
  }

  let user;
  try {
    [user] = await User.findOrCreate({
      where: { email: userInfo.email },
      defaults: {
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.avatar,
      },
    });
    await OAuthProvider.findOrCreate({
      where: {
        userId: user.id,
        provider: 'google',
        providerUserId: userInfo.providerUserId,
      },
    });
  } catch (error) {
    return res.status(500).send();
  }

  const userId = user.id.toString();
  return res.setAuthCookies(userId).status(302).redirect('/');
});

module.exports = router;
