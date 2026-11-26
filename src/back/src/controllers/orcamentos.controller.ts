import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { calcularOrcamento } from '../services/calculos.service.js';
import { calcularOrcamentoSchema, createOrcamentoSchema, updateStatusSchema } from '../services/validation.js';
import { normalizeItemInput, serializeOrcamento } from '../services/mappers.js';
import { parseNumber } from '../utils/numbers.js';
import { HttpError } from '../utils/http.js';
import { env } from '../config/env.js';

async function ensureDefaultVendedor(idVendedor?: number) {
  if (idVendedor) {
    const existing = await prisma.vendedor.findUnique({ where: { idVendedor } });
    if (existing) return existing.idVendedor;
  }

  const defaultSeller = await prisma.vendedor.upsert({
    where: { idVendedor: 1 },
    update: {},
    create: { idVendedor: 1, nome: env.DEFAULT_SELLER_NAME, ativo: true },
  });

  return defaultSeller.idVendedor;
}

function buildNumeroOrcamento() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  return `ORC-${stamp}`;
}

function getPagination(req: Request) {
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(100, Math.max(1, Number(req.query.limit || 50)));
  return { page, limit, skip: (page - 1) * limit };
}

export async function listOrcamentos(req: Request, res: Response) {
  const { page, limit, skip } = getPagination(req);
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const cliente = typeof req.query.cliente === 'string' ? req.query.cliente.trim() : '';

  const where = {
    ...(status ? { status: status as never } : {}),
    ...(cliente ? { nomeCliente: { contains: cliente } } : {}),
  };

  const [items, total] = await prisma.$transaction([
    prisma.orcamento.findMany({
      where,
      include: { itens: true },
      orderBy: { dataHoraCadastro: 'desc' },
      skip,
      take: limit,
    }),
    prisma.orcamento.count({ where }),
  ]);

  if (!req.query.page && !req.query.limit) {
    res.json(items.map(serializeOrcamento));
    return;
  }

  res.json({
    items: items.map(serializeOrcamento),
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function getOrcamento(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'ID inválido.');

  const orcamento = await prisma.orcamento.findUnique({
    where: { idOrcamento: id },
    include: { itens: true },
  });

  if (!orcamento) throw new HttpError(404, 'Orçamento não encontrado.');
  res.json(serializeOrcamento(orcamento));
}

export async function createOrcamento(req: Request, res: Response) {
  const payload = createOrcamentoSchema.parse(req.body);
  const idVendedor = await ensureDefaultVendedor(payload.idVendedor);
  const parametros = payload.parametros ?? {};

  let itens = payload.itens;
  let calculos = payload.calculos ?? [];
  let total = payload.total ?? {};

  if ((!itens || itens.length === 0) && payload.lajes?.length) {
    const calculado = calcularOrcamento(payload.lajes, parametros);
    itens = calculado.itens;
    calculos = calculado.calculos as unknown as Array<Record<string, unknown>>;
    total = calculado.total;
  }

  const defaultTipoLaje = parametros.tipoLaje ?? 'Treliçada Isopor H8';
  const valorTotal = parseNumber(payload.valorTotal ?? total.valor);

  const orcamento = await prisma.orcamento.create({
    data: {
      numeroOrcamento: payload.numeroOrcamento || buildNumeroOrcamento(),
      dataHoraCadastro: payload.dataHoraCadastro ? new Date(payload.dataHoraCadastro) : new Date(),
      dataHoraPdf: payload.dataHoraPdf ? new Date(payload.dataHoraPdf) : null,
      nomeCliente: payload.nomeCliente,
      telefoneCliente: payload.telefoneCliente ?? null,
      enderecoObra: payload.enderecoObra ?? null,
      tipoObra: payload.tipoObra,
      observacoes: payload.observacoes ?? null,
      formaEntrega: payload.formaEntrega ?? null,
      status: payload.status,
      freteIncluso: payload.freteIncluso || parseNumber(total.frete) > 0,
      valorTotal,
      observacoesEntrega: payload.observacoesEntrega ?? null,
      idVendedor,
      clienteJson: payload.cliente ?? null,
      parametrosJson: parametros,
      totalJson: total,
      calculosJson: calculos,
      itens: {
        create: itens.map((item, index) => normalizeItemInput(item, index, defaultTipoLaje)),
      },
    },
    include: { itens: true },
  });

  res.status(201).json(serializeOrcamento(orcamento));
}

export async function calcularPreviewOrcamento(req: Request, res: Response) {
  const payload = calcularOrcamentoSchema.parse(req.body);
  const resultado = calcularOrcamento(payload.lajes, payload.parametros);
  res.json(resultado);
}

export async function updateStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'ID inválido.');

  const { status } = updateStatusSchema.parse(req.body);
  const orcamento = await prisma.orcamento.update({
    where: { idOrcamento: id },
    data: { status },
    include: { itens: true },
  });

  res.json(serializeOrcamento(orcamento));
}

export async function deleteOrcamento(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) throw new HttpError(400, 'ID inválido.');

  await prisma.orcamento.delete({ where: { idOrcamento: id } });
  res.status(204).send();
}

export async function clearOrcamentos(_req: Request, res: Response) {
  await prisma.orcamento.deleteMany({});
  res.status(204).send();
}
