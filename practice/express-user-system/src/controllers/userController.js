import express from 'express';
import userService from '../services/userService.js';

const userController = express.Router();

userController.route('/users').post(async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userController.route('/session-login').post(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUser(email, password);
    req.session.userId = user.id;
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

userController.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUser(email, password);
    const accessToken = userService.createToken(user);
    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

export default userController;
