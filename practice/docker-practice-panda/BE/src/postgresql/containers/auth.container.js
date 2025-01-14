import { prismaClient } from '../connection/postgres.connection.js';
import { AuthController } from '../controllers/auth.controller.js';
import { UserRepo } from '../repos/user.repo.js';
import { AuthService } from '../services/auth.service.js';

const authModel = new UserRepo(prismaClient);
const authService = new AuthService(authModel);
const authController = new AuthController(authService);

export default authController;
