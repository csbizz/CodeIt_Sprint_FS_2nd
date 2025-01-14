import { prismaClient } from '../connection/postgres.connection.js';
import { ProductController } from '../controllers/product.controller.js';
import { ProductRepo } from '../repos/product.repo.js';
import { ProductService } from '../services/product.service.js';

const productModel = new ProductRepo(prismaClient);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

export default productController;
