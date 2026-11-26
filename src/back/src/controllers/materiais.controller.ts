import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { bulkMaterialSchema, materialSchema, materialUpdateSchema } from '../services/validation.js';
import { normalizeMaterialInput, serializeMaterial } from '../services/mappers.js';
import { HttpError } from '../utils/http.js';

export async function listMateriais(req: Request, res: Response) {
  const includeInactive = req.query.includeInactive === 'true';
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';

  const materiais = await prisma.parametro.findMany({
    where: {
      ...(includeInactive ? {} : { ativo: true }),
      ...(q ? { material: { contains: q } } : {}),
    },
    orderBy: [{ categoria: 'asc' }, { material: 'asc' }],
  });

  res.json(materiais.map(serializeMaterial));
}

export async function createMaterial(req: Request, res: Response) {
  const parsed = materialSchema.parse(req.body);
  const material = await prisma.parametro.create({ data: normalizeMaterialInput(parsed) });
  res.status(201).json(serializeMaterial(material));
}

export async function bulkCreateMateriais(req: Request, res: Response) {
  const { materiais } = bulkMaterialSchema.parse(req.body);

  const result = await prisma.$transaction(
    materiais.map((material) => prisma.parametro.create({ data: normalizeMaterialInput(material) })),
  );

  res.status(201).json({ items: result.map(serializeMaterial) });
}

export async function updateMaterial(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'ID inválido.');

  const parsed = materialUpdateSchema.parse(req.body);
  const current = await prisma.parametro.findUnique({ where: { idParametro: id } });
  if (!current) throw new HttpError(404, 'Material não encontrado.');

  const material = await prisma.parametro.update({
    where: { idParametro: id },
    data: normalizeMaterialInput({
      nome: parsed.nome ?? parsed.material ?? current.material,
      unidade: parsed.unidade ?? current.unidade,
      preco: parsed.preco ?? parsed.valorUnitario ?? Number(current.valorUnitario),
      categoria: parsed.categoria ?? current.categoria,
      imagem: parsed.imagem === undefined ? current.imagem : parsed.imagem,
      motivo: parsed.motivo ?? current.motivo,
      ativo: parsed.ativo ?? current.ativo,
    }),
  });

  res.json(serializeMaterial(material));
}

export async function deleteMaterial(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'ID inválido.');

  await prisma.parametro.delete({ where: { idParametro: id } });
  res.status(204).send();
}
