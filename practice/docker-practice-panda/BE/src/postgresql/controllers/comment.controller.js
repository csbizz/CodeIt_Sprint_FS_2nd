import { assert } from 'superstruct';
import { CreateComment, Cursor, PatchComment, PutComment, Uuid } from '../../struct.js';
import c from '../../utils/constants.js';

export class CommentController {
  constructor(commentService) {
    this.service = commentService;
  }

  getCommentsDev = async (req, res) => {
    res.json(await this.service.getComments());
  };

  getCommentsOfArticle = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.query.cursor, Cursor, c.MESSAGES.IDFORMAT);
    const articleId = req.params.id;
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    const resBody = await this.service.getPaginatedComments({
      id: articleId,
      limit,
      cursor,
      type: 'article',
    });

    res.status(200).json(resBody);
  };

  getCommentsOfProduct = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.query.cursor, Cursor, c.MESSAGES.IDFORMAT);
    const productId = req.params.id;
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor;

    const resBody = await this.service.getPaginatedComments({
      id: productId,
      limit,
      cursor,
      type: 'product',
    });

    res.status(200).json(resBody);
  };

  postCommentOfArticle = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);
    const articleId = req.params.id;

    const comment = await this.service.postComment({
      ...req.body,
      articleId,
    });
    res.status(201).json(comment);
  };

  postCommentOfProduct = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.body, CreateComment);
    const productId = req.params.id;

    const comment = await this.service.postComment({
      ...req.body,
      productId,
    });

    res.status(201).json(comment);
  };

  patchComment = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.body, PatchComment);
    const id = req.params.id;

    const comment = await this.service.patchComment(id, req.body);

    if (!comment) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(comment);
  };

  putComment = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.body, PutComment);
    const id = req.params.id;

    const comment = await this.service.putComment(id, req.body);

    if (!comment) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(comment);
  };

  deleteComment = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    const id = req.params.id;

    const comment = await this.service.deleteComment(id);

    if (!comment) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(comment);
  };
}
