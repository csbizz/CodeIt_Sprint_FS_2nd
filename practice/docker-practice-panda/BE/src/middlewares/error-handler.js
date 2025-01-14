import { Prisma } from '@prisma/client';
import { StructError } from 'superstruct';
import c from '../utils/constants.js';
import { CastError, ValidationError } from '../utils/error.js';

export default function errorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof Prisma.PrismaClientValidationError || err instanceof TypeError || err instanceof ValidationError) {
    res.status(c.HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
  } else if (
    err instanceof StructError ||
    (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') ||
    err instanceof CastError
  ) {
    res.sendStatus(c.HTTP_STATUS.NOT_FOUND);
  } else {
    res.status(c.HTTP_STATUS.SERVER_ERROR).send({ message: err.message });
  }
}
