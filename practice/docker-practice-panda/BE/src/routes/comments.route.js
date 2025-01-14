import express from 'express';
import { verifyAccessToken } from '../middlewares/auth.js';
import postgresCommentController from '../postgresql/containers/comment.container.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .patch(verifyAccessToken, postgresCommentController.patchComment)
  .put(verifyAccessToken, postgresCommentController.putComment)
  .delete(verifyAccessToken, postgresCommentController.deleteComment);

export default commentRouter;
