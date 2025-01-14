import { prismaClient } from '../connection/postgres.connection.js';
import { CommentController } from '../controllers/comment.controller.js';
import { CommentRepo } from '../repos/comment.repo.js';
import { CommentService } from '../services/comment.service.js';

const commentModel = new CommentRepo(prismaClient);
const commentService = new CommentService(commentModel);
const commentController = new CommentController(commentService);

export default commentController;
