export default function validatePaginationOptions(req, res, next) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const limit = req.query.limit;

  if (page && isNaN(parseInt(page))) throw new TypeError('page should be an integer');
  if (pageSize && isNaN(parseInt(pageSize))) throw new TypeError('pageSize should be an integer');
  if (limit && isNaN(parseInt(limit))) throw new TypeError('limit should be an integer');

  if (parseInt(page) <= 0) throw new TypeError('page must be at least 1.');
  if (parseInt(pageSize) <= 0) throw new TypeError('pageSize must be at least 1.');
  if (parseInt(limit) <= 0) throw new TypeError('limit must be at least 1.');

  next();
}
