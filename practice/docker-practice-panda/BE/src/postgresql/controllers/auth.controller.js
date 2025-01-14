import { assert } from 'superstruct';
import { CreateUser, SignIn } from '../../struct.js';

export class AuthController {
  constructor(authService) {
    this.service = authService;
  }

  signUp = async (req, res, next) => {
    assert(req.body, CreateUser);

    const user = await this.service.createUser(req.body);

    if (!user) res.status(400).json();
    // NOTE 유저가 이미 존재함
    if (user === true) res.status(400).json({ messages: 'User already exist' });
    res.status(201).json(user);
  };

  signIn = async (req, res) => {
    assert(req.body, SignIn);

    const { user, refreshToken } = await this.service.signIn(req.body);

    if (!user) res.status(401).json();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true, // NOTE https가 아니면 false로
    });
    res.json(user);
  };

  getMe = async (req, res) => {
    const { userId } = req.user;
    if (!userId) res.status(400).json();

    const user = await this.service.getUserById(userId);
    if (!user) res.status(404).json();

    res.json(user);
  };

  refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    const { userId } = req.user;
    if (!userId) res.status(400).json();

    const user = await this.service.getNewToken(req.user, refreshToken);
    if (!user) res.status(404).json();

    res.json(user);
  };
}
