import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  let database = 'unknown';

  try {
    await prisma.$queryRaw`SELECT 1`;
    database = 'ok';
  } catch {
    database = 'unavailable';
  }

  res.json({
    status: 'ok',
    service: 'prolaje-backend',
    database,
    timestamp: new Date().toISOString(),
  });
});
