import { prismaClient } from '../connection/postgres.connection.js';
import { ArticleController } from '../controllers/article.controller.js';
import { ArticleRepo } from '../repos/article.repo.js';
import { ArticleService } from '../services/article.service.js';

const articleModel = new ArticleRepo(prismaClient);
const articleService = new ArticleService(articleModel);
const articleController = new ArticleController(articleService);

export default articleController;
