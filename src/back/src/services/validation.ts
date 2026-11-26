import { z } from 'zod';
import { parseNumber } from '../utils/numbers.js';

const optionalNumberLike = z.union([z.number(), z.string()]).optional().nullable();
const optionalMaterialImage = z.string()
  .max(1_500_000, 'A imagem deve ter no máximo 1,5 MB.')
  .refine((value) => !value || /^data:image\/(png|jpe?g|webp);base64,/i.test(value), {
    message: 'Envie uma imagem PNG, JPEG ou WebP válida.',
  })
  .optional()
  .nullable();

export const materialSchema = z.object({
  nome: z.string().trim().optional(),
  material: z.string().trim().optional(),
  unidade: z.string().trim().default('un'),
  preco: optionalNumberLike,
  valorUnitario: optionalNumberLike,
  categoria: z.string().trim().default('Padrão'),
  imagem: optionalMaterialImage,
  motivo: z.string().trim().optional().nullable(),
  ativo: z.boolean().optional().default(true),
}).refine((data) => Boolean(data.nome || data.material), {
  message: 'Informe o nome/material.',
  path: ['nome'],
});

export const materialUpdateSchema = z.object({
  nome: z.string().trim().optional(),
  material: z.string().trim().optional(),
  unidade: z.string().trim().optional(),
  preco: optionalNumberLike,
  valorUnitario: optionalNumberLike,
  categoria: z.string().trim().optional(),
  imagem: optionalMaterialImage,
  motivo: z.string().trim().optional().nullable(),
  ativo: z.boolean().optional(),
});

export const bulkMaterialSchema = z.object({
  materiais: z.array(materialSchema).min(1),
});

export const lajeSchema = z.object({
  ambiente: z.string().optional(),
  descricaoAmbiente: z.string().optional(),
  comprimento: optionalNumberLike,
  largura: optionalNumberLike,
  ladoMenor: optionalNumberLike,
  irregular: z.boolean().optional().default(false),
  quantidade: optionalNumberLike,
  sentido: z.string().optional(),
});

const lajeCalculoSchema = lajeSchema.superRefine((laje, context) => {
  const comprimento = parseNumber(laje.comprimento);
  const largura = parseNumber(laje.largura);
  const ladoMenor = parseNumber(laje.ladoMenor);
  const quantidade = laje.quantidade == null ? 1 : parseNumber(laje.quantidade);

  if (comprimento <= 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Comprimento deve ser maior que zero.',
      path: ['comprimento'],
    });
  }
  if (largura <= 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Largura deve ser maior que zero.',
      path: ['largura'],
    });
  }
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Quantidade deve ser um inteiro maior ou igual a 1.',
      path: ['quantidade'],
    });
  }
  if (laje.irregular && ladoMenor <= 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Informe a largura menor da laje irregular.',
      path: ['ladoMenor'],
    });
  }
  if (laje.irregular && ladoMenor >= largura) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'A largura menor deve ser menor que a largura maior.',
      path: ['ladoMenor'],
    });
  }
});

export const parametrosCalculoSchema = z.object({
  tipoLaje: z.string().optional(),
  enchimento: z.string().optional(),
  altura: z.string().optional(),
  capaConcreto: optionalNumberLike,
  intereixo: optionalNumberLike,
  sobrecarga: z.string().optional(),
  perdaTecnica: optionalNumberLike,
  precoM2: optionalNumberLike,
  valorFrete: optionalNumberLike,
  reforco: optionalNumberLike,
}).passthrough();

export const calcularOrcamentoSchema = z.object({
  lajes: z.array(lajeCalculoSchema).min(1),
  parametros: parametrosCalculoSchema.default({}),
});

export const itemOrcamentoSchema = z.object({
  descricaoAmbiente: z.string().optional(),
  comprimento: optionalNumberLike,
  largura: optionalNumberLike,
  ladoMenor: optionalNumberLike,
  irregular: z.boolean().optional().default(false),
  quantidade: optionalNumberLike,
  sentido: z.string().optional(),
  tipoLaje: z.string().optional(),
  reforco: z.boolean().optional(),
  qtdVigotas: optionalNumberLike,
  qtdLajotas: optionalNumberLike,
  qtdCimento: optionalNumberLike,
  qtdAco: optionalNumberLike,
  valorMateriais: optionalNumberLike,
  valorFrete: optionalNumberLike,
  valorSubtotal: optionalNumberLike,
  observacoesTecnicas: z.string().optional(),
  medidasProgressivas: z.array(z.number()).optional(),
}).passthrough();

export const createOrcamentoSchema = z.object({
  numeroOrcamento: z.string().trim().optional(),
  dataHoraCadastro: z.string().datetime().optional(),
  dataHoraPdf: z.string().datetime().optional().nullable(),
  nomeCliente: z.string().trim().min(1, 'Informe o nome do cliente.'),
  telefoneCliente: z.string().trim().optional().nullable(),
  enderecoObra: z.string().trim().optional().nullable(),
  tipoObra: z.enum(['Residencial', 'Comercial', 'Industrial']).optional().default('Residencial'),
  observacoes: z.string().optional().nullable(),
  formaEntrega: z.enum(['Impresso', 'WhatsApp', 'Email']).optional().nullable(),
  status: z.enum(['Rascunho', 'Pendente', 'Enviado', 'Aprovado', 'Aceito', 'Recusado']).optional().default('Pendente'),
  freteIncluso: z.boolean().optional().default(false),
  valorTotal: optionalNumberLike,
  observacoesEntrega: z.string().optional().nullable(),
  idVendedor: z.number().int().positive().optional(),
  cliente: z.record(z.unknown()).optional(),
  parametros: parametrosCalculoSchema.optional(),
  total: z.record(z.unknown()).optional(),
  calculos: z.array(z.record(z.unknown())).optional(),
  lajes: z.array(lajeSchema).optional(),
  itens: z.array(itemOrcamentoSchema).default([]),
}).passthrough();

export const updateStatusSchema = z.object({
  status: z.enum(['Rascunho', 'Pendente', 'Enviado', 'Aprovado', 'Aceito', 'Recusado']),
});

export const vendedorSchema = z.object({
  nome: z.string().trim().min(1),
  ativo: z.boolean().optional().default(true),
});

export const parametroCalculoSchema = z.object({
  tipoParametro: z.string().trim().min(1),
  tipoLaje: z.string().trim().min(1),
  valor: optionalNumberLike,
  motivo: z.string().optional().nullable(),
  ativo: z.boolean().optional().default(true),
});
