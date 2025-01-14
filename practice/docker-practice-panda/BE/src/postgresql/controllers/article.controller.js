import { assert } from 'superstruct';
import { CreateArticle, PatchArticle, Uuid } from '../../struct.js';
import c from '../../utils/constants.js';

export class ArticleController {
  constructor(articleService) {
    this.service = articleService;
  }

  getArticles = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    const resBody = await this.service.getPaginatedArticles({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    res.status(200).json(resBody);
  };

  getArticleById = async (req, res) => {
    assert(req.params.id, Uuid);
    const id = req.params.id;

    const article = await this.service.getArticle(id);

    if (!article) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(article);
  };

  postArticle = async (req, res) => {
    assert(req.body, CreateArticle);

    const article = await this.service.postArticle(req.body);

    res.status(201).json(article);
  };

  patchArticle = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.body, PatchArticle);
    const id = req.params.id;

    const article = await this.service.patchArticle(id, req.body);

    if (!article) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(article);
  };

  deleteArticle = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    const id = req.params.id;

    const article = await this.service.deleteArticle(id);

    if (!article) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(article);
  };

  postArticleLike = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    const articleId = req.params.id;
    const userId = '';
    const article = await this.service.postArticleLike(articleId, userId);

    if (!article) res.status(404).json();
    res.json(article);
  };

  deleteArticleLike = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    const articleId = req.params.id;
    const userId = '';
    const article = await this.service.deleteArticleLike(articleId, userId);

    if (!article) res.status(404).json();
    res.json(article);
  };
}
