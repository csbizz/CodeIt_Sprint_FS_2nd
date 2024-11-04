const { google } = require('googleapis');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
} = require('../config');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${BASE_URL}/api/auth/google/callback`,
);

function generateAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
}

async function getTokens(code) {
  try {
    const res = await oauth2Client.getToken(code);
    return res.tokens;
  } catch (error) {
    throw error;
  }
}

async function getUserInfoFromIdToken(idToken) {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const {
      sub: providerUserId,
      email,
      picture: avatar,
      name,
    } = ticket.getPayload();
    return {
      providerUserId,
      email,
      name,
      avatar,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  generateAuthUrl,
  getTokens,
  getUserInfoFromIdToken,
};
