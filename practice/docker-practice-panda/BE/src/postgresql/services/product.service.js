export class ProductService {
  constructor(productRepo) {
    this.repo = productRepo;
  }

  getPaginatedProducts = async ({ orderBy, page, pageSize, keyword }) => {
    const totalCount = await this.repo.count(keyword);

    const list = await this.repo.findMany({
      orderBy,
      page,
      pageSize,
      keyword,
    });

    return { totalCount, list };
  };

  getProduct = async id => {
    const product = await this.repo.findById(id);

    const tags = product.productTags.map(tagObj => tagObj.tag);
    const result = { ...product, tags, ownerNickname: product.owner.nickname };
    delete result.productTags;
    delete result.owner;

    return result;
  };

  postProduct = async body => {
    const { product, image } = await this.repo.create(body);
    product.imageUrl = `/files/${image.fileName}`;

    return product;
  };

  patchProduct = async (id, body) => {
    const product = await this.repo.findById(id);
    if (!product) return;

    const updated = await this.repo.update(id, body);

    return updated;
  };

  deleteProduct = async id => {
    const product = await this.repo.deleteById(id);

    return product;
  };

  postProductLike = async (productId, userId) => {
    const product = await this.repo.like(productId, userId);
    product.isLiked = true;

    return product;
  };

  deleteProductLike = async (productId, userId) => {
    const product = await this.repo.unlike(productId, userId);
    product.isLiked = false;

    return product;
  };
}
