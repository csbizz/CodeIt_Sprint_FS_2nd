import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import multer from 'multer';
import errorHandler from './middlewares/error-handler.js';
import validatePaginationOptions from './middlewares/pagination.validation.js';
import articleRouter from './routes/articles.route.js';
import authRouter from './routes/auth.route.js';
import commentRouter from './routes/comments.route.js';
import devRouter from './routes/dev.route.js';
import productRouter from './routes/products.route.js';

const app = express();

const upload = multer({ dest: 'uploads/' });
/*********************************************************************************** middlewares **********************************************************************************************/
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(upload.single('file'));
app.use('/files', express.static('uploads'));
app.use(validatePaginationOptions);

/*********************************************************************************** routes **********************************************************************************************/
app.use('/dev', devRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

/*********************************************************************************** handlers **********************************************************************************************/
app.use(errorHandler);

const startServer = async () => {
  try {
    // 기본 포트(3000)로 시도
    await new Promise((resolve, reject) => {
      const server = app.listen(process.env.PORT, () => {
        console.log(`Server Started on port ${process.env.PORT}`);
        resolve();
      });

      server.on('error', err => {
        if (err.code === 'EADDRINUSE') {
          // 기본 포트가 사용 중이면 reject
          reject(err);
        }
      });
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      // 3000번 포트가 사용 중이면 3001로 시도
      app.listen(3001, () => {
        console.log('Server Started on port 3001 (fallback)');
      });
    } else {
      console.error('Failed to start server:', error);
    }
  }
};
startServer();
