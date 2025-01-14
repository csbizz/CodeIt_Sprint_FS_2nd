export class UserRepo {
  constructor(client) {
    this.db = client.user;
  }

  count = async keyword => {
    const searchOption = keyword ? { where: { nickname: { contains: keyword } } } : {};

    const count = await this.db.count(searchOption);

    return count;
  };

  findMany = async ({ orderBy, page, pageSize, keyword }) => {
    let sortOption;
    switch (orderBy) {
      case 'like':
        sortOption = { orderBy: { like: 'desc' } };
        break;
      case 'recent':
      default:
        sortOption = { orderBy: { createdAt: 'desc' } };
    }

    const searchOption = keyword ? { where: { nickname: { contains: keyword } } } : {};

    const users = await this.db.findMany({
      ...searchOption,
      ...sortOption,
      take: pageSize,
      skip: page,
    });

    return users;
  };

  findById = async id => {
    const user = await this.db.findUnique({
      where: { id },
    });

    return user;
  };

  findByEmail = async email => {
    const user = await this.db.findUnique({
      where: { email },
    });

    return user;
  };

  findBySignInForm = async body => {
    const { email, password } = body;
    const user = await this.db.findFirst({
      where: { email, password },
    });

    return user;
  };

  create = async data => {
    const user = await this.db.create({ data });

    return user;
  };

  update = async (id, data) => {
    const user = await this.db.update({ where: { id }, data });

    return user;
  };
}
