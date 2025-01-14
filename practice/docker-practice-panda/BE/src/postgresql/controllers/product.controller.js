import { assert } from 'superstruct';
import { PatchProduct, Uuid } from '../../struct.js';
import c from '../../utils/constants.js';

export class ProductController {
  constructor(productService) {
    this.service = productService;
  }

  getProducts = async (req, res) => {
    const orderBy = req.query.orderBy || 'recent';
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const keyword = req.query.keyword || '';

    const resBody = await this.service.getPaginatedProducts({
      orderBy,
      page,
      pageSize,
      keyword,
    });
    if (!resBody) res.status(404).json();

    res.json(resBody);
  };

  getProductById = async (req, res) => {
    assert(req.params.id, Uuid);
    const id = req.params.id;

    const product = await this.service.getProduct(id);

    if (!product) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(product);
  };

  postProduct = async (req, res) => {
    const product = await this.service.postProduct(req.body);

    if (!product) res.status(404).json();
    res.status(201).json(product);
  };

  patchProduct = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    assert(req.body, PatchProduct);
    const id = req.params.id;

    const product = await this.service.patchProduct(id, req.body);

    if (!product) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(product);
  };

  deleteProduct = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    const id = req.params.id;

    const product = await this.service.deleteProduct(id);

    if (!product) res.status(404).json({ message: c.MESSAGES.NOID });

    res.json(product);
  };

  postProductLike = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    const productId = req.params.id;
    const { userId } = req.user;
    const product = await this.service.postProductLike(productId, userId);

    if (!product) res.status(404).json();
    res.json(product);
  };

  deleteProductLike = async (req, res) => {
    assert(req.params.id, Uuid, c.MESSAGES.IDFORMAT);
    const productId = req.params.id;
    const { userId } = req.user;
    const product = await this.service.deleteProductLike(productId, userId);

    if (!product) res.status(404).json();
    res.json(product);
  };
}
