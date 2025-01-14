import jwt from 'jsonwebtoken';
import { jwtSecret } from '../configs/auth.config.js';

export default function createToken(user, type) {
  jwt;
  const payload = { userId: user.id };
  let options;
  switch (type) {
    case 'access':
      options = { expiresIn: EXPIRE_TIME.ACCESS };
      break;
    case 'refresh':
      options = { expiresIn: EXPIRE_TIME.REFRESH };
      break;
    default:
  }

  const token = jwt.sign(payload, jwtSecret, options);

  return token;
}

const EXPIRE_TIME = Object.freeze({
  ACCESS: '1h',
  REFRESH: '2w',
});
