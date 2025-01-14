import express from 'express';
import { verifyAccessToken, verifyRefreshToken } from '../middlewares/auth.js';
import hashPassword from '../middlewares/hash.js';
import postgresAuthController from '../postgresql/containers/auth.container.js';
import compareExp from '../utils/compareExp.js';

export const authRouter = express.Router();

authRouter.use('/', (req, res, next) => {
  console.log(req.cookies);
  next();
});
authRouter.post('/signUp', hashPassword, postgresAuthController.signUp);
authRouter.post('/signIn', postgresAuthController.signIn);
authRouter.get('/me', verifyAccessToken, postgresAuthController.getMe);
authRouter.post('/refresh', verifyRefreshToken, postgresAuthController.refreshToken);

authRouter.get('/test', verifyAccessToken, (req, res) => {
  console.log('user: ', req.user);
  compareExp(req.user.exp);
});

export default authRouter;
