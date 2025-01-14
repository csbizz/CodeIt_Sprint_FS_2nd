import { expressjwt } from 'express-jwt';
import { jwtSecret } from '../configs/auth.config.js';

export const verifyAccessToken = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
  requestProperty: 'user',
});

export const verifyRefreshToken = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
  getToken: req => req.cookies.refreshToken,
  requestProperty: 'user',
});
