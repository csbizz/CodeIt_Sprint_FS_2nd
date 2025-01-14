import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';

function filterSensitiveUserData(user) {
  const { password, ...rest } = user;

  return rest;
}
function verifyPassword(inputPassword, password) {
  const isMatch = inputPassword === password;
  if (!isMatch) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
}

async function createUser(user) {
  const isExist = await !!userRepository.findByEmail(user.email);

  if (!isExist) {
    const error = new Error('User already exists');
    error.code = 422;
    error.data = { email: user.email };
    return error;
  }

  const newUser = await userRepository.save(user);
  const filteredUser = filterSensitiveUserData(newUser);
  return filteredUser;
}

async function getUser(email, password) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('Unauthorized');
    error.code = 401;
    throw error;
  }
  verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
}

function createToken(user) {
  const payload = { userId: user.id };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export default {
  createUser,
  getUser,
  createToken,
};
