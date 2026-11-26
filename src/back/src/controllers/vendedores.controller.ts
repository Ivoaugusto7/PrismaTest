import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { vendedorSchema } from '../services/validation.js';
import { serializeVendedor } from '../services/mappers.js';

export async function listVendedores(_req: Request, res: Response) {
  const vendedores = await prisma.vendedor.findMany({ orderBy: { nome: 'asc' } });
  res.json(vendedores.map(serializeVendedor));
}

export async function createVendedor(req: Request, res: Response) {
  const data = vendedorSchema.parse(req.body);
  const vendedor = await prisma.vendedor.create({ data });
  res.status(201).json(serializeVendedor(vendedor));
}
