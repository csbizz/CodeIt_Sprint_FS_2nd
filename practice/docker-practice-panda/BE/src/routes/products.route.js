import express from 'express';
import { verifyAccessToken } from '../middlewares/auth.js';
import validateProduct from '../middlewares/product.validation.js';
import postgresCommentController from '../postgresql/containers/comment.container.js';
import postgresProductController from '../postgresql/containers/product.container.js';
// import { productController as mongocbProductController } from '../mongodb/containers/product.container.js';

export const productRouter = express.Router();

// mongoDB (deprecated)
// productRouter.route('/').get(mongodbProductController.getProducts).post(mongodbProductController.postProduct);
// productRouter
//   .route('/:id')
//   .get(mongodbProductController.getProductById)
//   .patch(mongodbProductController.patchProduct)
//   .delete(mongodbProductController.deleteProduct);

// postgreSQL
productRouter
  .route('/')
  .get(postgresProductController.getProducts)
  .post(verifyAccessToken, validateProduct, postgresProductController.postProduct);

productRouter
  .route('/:id')
  .get(postgresProductController.getProductById)
  .patch(verifyAccessToken, validateProduct, postgresProductController.patchProduct)
  .delete(verifyAccessToken, postgresProductController.deleteProduct);

productRouter
  .route('/:id/comments')
  .get(postgresCommentController.getCommentsOfProduct)
  .post(verifyAccessToken, postgresCommentController.postCommentOfProduct);

productRouter
  .route('/:id/like', verifyAccessToken)
  .post(postgresProductController.postProductLike)
  .delete(postgresProductController.deleteProductLike);

export default productRouter;
