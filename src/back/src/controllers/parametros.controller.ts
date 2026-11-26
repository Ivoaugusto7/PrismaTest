import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { parametroCalculoSchema } from '../services/validation.js';
import { parseNumber } from '../utils/numbers.js';

function serializeParametroCalculo(parametro: Awaited<ReturnType<typeof prisma.parametroCalculo.findFirst>>) {
  if (!parametro) return null;

  return {
    id: parametro.idParamCalculo,
    idParamCalculo: parametro.idParamCalculo,
    tipoParametro: parametro.tipoParametro,
    tipoLaje: parametro.tipoLaje,
    valor: Number(parametro.valor),
    dataVigencia: parametro.dataVigencia.toISOString(),
    motivo: parametro.motivo,
    ativo: parametro.ativo,
  };
}

export async function listParametrosCalculo(req: Request, res: Response) {
  const tipoLaje = typeof req.query.tipoLaje === 'string' ? req.query.tipoLaje : undefined;
  const includeInactive = req.query.includeInactive === 'true';

  const parametros = await prisma.parametroCalculo.findMany({
    where: {
      ...(includeInactive ? {} : { ativo: true }),
      ...(tipoLaje ? { tipoLaje } : {}),
    },
    orderBy: [{ tipoLaje: 'asc' }, { tipoParametro: 'asc' }, { dataVigencia: 'desc' }],
  });

  res.json(parametros.map(serializeParametroCalculo));
}

export async function createParametroCalculo(req: Request, res: Response) {
  const payload = parametroCalculoSchema.parse(req.body);
  const parametro = await prisma.parametroCalculo.create({
    data: {
      tipoParametro: payload.tipoParametro,
      tipoLaje: payload.tipoLaje,
      valor: parseNumber(payload.valor),
      motivo: payload.motivo ?? null,
      ativo: payload.ativo,
    },
  });

  res.status(201).json(serializeParametroCalculo(parametro));
}
