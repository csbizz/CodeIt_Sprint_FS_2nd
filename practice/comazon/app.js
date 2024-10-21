import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { assert } from 'superstruct';
import {
  CreateUser,
  PatchUser,
  CreateProduct,
  PatchProduct,
  CreateOrder,
  PatchOrder,
  PostSavedProduct,
} from './structs.js';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === 'StructError' ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

/*********** users ***********/

app.get(
  '/users',
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = 'newest' } = req.query;
    let orderBy;
    switch (order) {
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
    }
    const users = await prisma.user.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
      include: {
        // userPreference: true,
        userPreference: {
          select: { receiveEmail: true },
        },
      },
    });
    res.send(users);
  })
);

app.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        // userPreference: true,
        userPreference: {
          select: { receiveEmail: true },
        },
      },
    });
    res.send(user);
  })
);

app.get(
  '/users/:id/saved-products',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { savedProducts } = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        savedProducts: true,
      },
    });
    res.send(savedProducts);
  })
);

app.get(
  '/users/:id/orders',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { orders } = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        orders: true,
      },
    });
    res.send(orders);
  })
);

app.post(
  '/users',
  asyncHandler(async (req, res) => {
    assert(req.body, CreateUser);
    const { userPreference, ...userFields } = req.body;
    const user = await prisma.user.create({
      data: { ...userFields, userPreference: { create: userPreference } },
      include: { userPreference: true },
    });
    res.status(201).send(user);
  })
);

app.post(
  '/users/:id/saved-products',
  asyncHandler(async (req, res) => {
    assert(req.body, PostSavedProduct);
    const { id: userId } = req.params;
    const { productId } = req.body;

    // 이미 찜해뒀는지 확인
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        savedProducts: true,
      },
    });
    const isSaved = user.savedProducts.some((p) => p.id === productId);
    const option = isSaved
      ? { disconnect: { id: productId } }
      : { connect: { id: productId } };

    // 찜해뒀으면 삭제, 아니면 추가
    const { savedProducts } = await prisma.user.update({
      where: { id: userId },
      data: { savedProducts: option },
      include: {
        savedProducts: true,
      },
    });
    res.send(savedProducts);
  })
);

app.patch(
  '/users/:id',
  asyncHandler(async (req, res) => {
    assert(req.body, PatchUser);
    const { id } = req.params;
    const { userPreference, ...userFields } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { ...userFields, userPreference: { update: userPreference } },
      include: { userPreference: true },
    });
    res.send(user);
  })
);

app.delete(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

/*********** products ***********/

app.get(
  '/products',
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = 'newest', category } = req.query;
    let orderBy;
    switch (order) {
      case 'priceLowest':
        orderBy = { price: 'asc' };
        break;
      case 'priceHighest':
        orderBy = { price: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
    }
    const where = category ? { category } : {};
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
    });
    res.send(products);
  })
);

app.get(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    res.send(product);
  })
);

app.post(
  '/products',
  asyncHandler(async (req, res) => {
    assert(req.body, CreateProduct);
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).send(product);
  })
);

app.patch(
  '/products/:id',
  asyncHandler(async (req, res) => {
    assert(req.body, PatchProduct);
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.send(product);
  })
);

app.delete(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

/*********** orders ***********/

app.get(
  '/orders',
  asyncHandler(async (req, res) => {
    const orders = await prisma.order.findMany();
    res.send(orders);
  })
);

app.get(
  '/orders/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await prisma.order.findUniqueOrThrow({
      where: { id },
      include: {
        orderItems: true,
      },
    });
    let total = 0;
    order.orderItems.forEach((orderItem) => {
      total += orderItem.unitPrice * orderItem.quantity;
    });
    order.total = total; // Computed Field
    res.send(order);
  })
);

app.post(
  '/orders',
  asyncHandler(async (req, res) => {
    assert(req.body, CreateOrder);
    const { orderItems, ...orderFields } = req.body;

    // 재고 확인
    const productIds = orderItems.map((orderItem) => orderItem.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    function getQuantity(productId) {
      const orderItem = orderItems.find(
        (orderItem) => orderItem.productId === productId
      );
      return orderItem.quantity;
    }

    const isSufficientStock = products.every((product) => {
      const { id, stock } = product;
      return stock >= getQuantity(id);
    });

    if (!isSufficientStock) throw new Error('Insufficient Stock');

    // 재고 감소
    const decrementStocksQueries = orderItems.map((orderItem) => {
      prisma.product.update({
        where: { id: orderItem.productId },
        data: { stock: { decrement: orderItem.quantity } },
      });
    });

    // order 생성
    const createOrderQuery = prisma.order.create({
      data: { ...orderFields, orderItems: { create: orderItems } },
      include: { orderItems: true },
    });

    // transaction으로 한번에 처리, 하나라도 오류가 발생할 경우 전체 드랍
    const [order] = await prisma.$transaction([
      createOrderQuery,
      ...decrementStocksQueries,
    ]);
    res.status(201).send(order);
  })
);

app.patch(
  '/orders/:id',
  asyncHandler(async (req, res) => {
    assert(req.body, PatchOrder);
    const { id } = req.params;
    const order = await prisma.order.update({
      where: { id },
      data: req.body,
    });
    res.send(order);
  })
);

app.delete(
  '/orders/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await prisma.order.delete({ where: { id } });
    res.sendStatus(204);
  })
);

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
