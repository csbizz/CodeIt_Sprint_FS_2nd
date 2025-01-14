import express from 'express';
import postgresCommentController from '../postgresql/containers/comment.container.js';
import postgresUserController from '../postgresql/containers/user.container.js';

export const devRouter = express.Router();

devRouter.get('/users', postgresUserController.getUsersDev);

devRouter.get('/comments', postgresCommentController.getCommentsDev);

devRouter.get('/error', async (req, res) => {
  throw new Error('TEST ERROR');
});

devRouter.post('/files', (req, res, next) => {
  console.log(req.file);
  const path = `/dev/files/${req.file.filename}`;
  res.json({ message: 'File Uploaded' });
});

export default devRouter;
