import type { ErrorRequestHandler, RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { HttpError } from '../utils/http.js';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, `Rota não encontrada: ${req.method} ${req.originalUrl}`));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Dados inválidos.',
      issues: error.issues,
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ message: error.message, details: error.details });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Registro duplicado.', details: error.meta });
      return;
    }

    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Registro não encontrado.' });
      return;
    }
  }

  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor.' });
};
