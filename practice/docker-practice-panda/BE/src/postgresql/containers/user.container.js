import { prismaClient } from '../connection/postgres.connection.js';
import { UserController } from '../controllers/user.controller.js';
import { UserRepo } from '../repos/user.repo.js';
import { UserService } from '../services/user.service.js';

const userModel = new UserRepo(prismaClient);
const userService = new UserService(userModel);
const userController = new UserController(userService);

export default userController;
