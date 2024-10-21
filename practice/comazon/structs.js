import * as s from 'superstruct';
import isEmail from 'is-email';
import isUuid from 'is-uuid';
import { Category, OrderStatus } from '@prisma/client';

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));

const CreateUser = s.object({
  email: s.define('Email', isEmail),
  firstName: s.size(s.string(), 1, 30),
  lastName: s.size(s.string(), 1, 30),
  address: s.string(),
  userPreference: s.object({
    receiveEmail: s.boolean(),
  }),
});

const PatchUser = s.partial(CreateUser);

const CreateProduct = s.object({
  name: s.size(s.string(), 1, 60),
  description: s.string(),
  category: s.enums(Object.keys(Category)),
  price: s.min(s.number(), 0),
  stock: s.min(s.integer(), 0),
});

const PatchProduct = s.partial(CreateProduct);

const CreateOrder = s.object({
  userId: Uuid,
  orderItems: s.size(
    s.array(
      s.object({
        productId: Uuid,
        unitPrice: s.min(s.number(), 0),
        quantity: s.min(s.integer(), 1),
      })
    ),
    1,
    Infinity
  ),
});

const PatchOrder = s.object({ status: s.enums(Object.keys(OrderStatus)) });

const PostSavedProduct = s.object({ productId: Uuid });

export {
  CreateUser,
  PatchUser,
  CreateProduct,
  PatchProduct,
  CreateOrder,
  PatchOrder,
  PostSavedProduct,
};
