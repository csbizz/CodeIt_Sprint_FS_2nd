import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from '../struct.js';

export default function validateProduct(req, res, next) {
  req.body = JSON.parse(req.body.data);
  switch (req.method) {
    case 'POST':
      if (req.body?.tags?.length < 1 || req.body?.tags?.length > 5) throw new Error('invalid tags length');
      assert(req.body, CreateProduct);
      break;
    case 'PATCH':
      if (req.body?.tags?.length < 1 || req.body?.tags?.length > 5) throw new Error('invalid tags length');
      assert(req.body, PatchProduct);
      break;
  }
  req.body.file = req.file;

  next();
}
