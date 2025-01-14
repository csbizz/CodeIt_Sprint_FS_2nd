import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import productController from './controllers/productController.js';
import reviewController from './controllers/reviewController.js';
import userController from './controllers/userController.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('', userController);
app.use('/products', productController);
app.use('/reviews', reviewController);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
