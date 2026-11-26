import type { ItemOrcamento, Orcamento, Parametro, Vendedor } from '@prisma/client';
import { parseNumber, parsePositiveInteger } from '../utils/numbers.js';

export function serializeVendedor(vendedor: Vendedor) {
  return {
    id: vendedor.idVendedor,
    idVendedor: vendedor.idVendedor,
    nome: vendedor.nome,
    ativo: vendedor.ativo,
  };
}

export function serializeMaterial(material: Parametro) {
  return {
    id: material.idParametro,
    idParametro: material.idParametro,
    nome: material.material,
    material: material.material,
    imagem: material.imagem,
    unidade: material.unidade,
    preco: Number(material.valorUnitario),
    valorUnitario: Number(material.valorUnitario),
    categoria: material.categoria,
    dataVigencia: material.dataVigencia.toISOString(),
    motivo: material.motivo,
    ativo: material.ativo,
  };
}

export function serializeItem(item: ItemOrcamento) {
  return {
    id: item.idItem,
    idItem: item.idItem,
    descricaoAmbiente: item.descricaoAmbiente,
    comprimento: Number(item.comprimento),
    largura: Number(item.largura),
    ladoMenor: item.ladoMenor === null ? 0 : Number(item.ladoMenor),
    irregular: item.irregular,
    quantidade: item.quantidade,
    sentido: item.sentido,
    tipoLaje: item.tipoLaje,
    reforco: item.reforco,
    qtdVigotas: item.qtdVigotas,
    qtdLajotas: item.qtdLajotas,
    qtdCimento: item.qtdCimento === null ? null : Number(item.qtdCimento),
    qtdAco: item.qtdAco === null ? null : Number(item.qtdAco),
    valorMateriais: item.valorMateriais === null ? null : Number(item.valorMateriais),
    valorFrete: item.valorFrete === null ? null : Number(item.valorFrete),
    valorSubtotal: item.valorSubtotal === null ? null : Number(item.valorSubtotal),
    observacoesTecnicas: item.observacoesTecnicas,
    medidasProgressivas: item.medidasProgressivas,
  };
}

type OrcamentoWithItens = Orcamento & { itens: ItemOrcamento[] };

export function serializeOrcamento(orcamento: OrcamentoWithItens) {
  const itens = orcamento.itens.map(serializeItem);
  const clienteFromJson = typeof orcamento.clienteJson === 'object' && orcamento.clienteJson !== null
    ? orcamento.clienteJson
    : null;

  return {
    id: orcamento.idOrcamento,
    idOrcamento: orcamento.idOrcamento,
    numeroOrcamento: orcamento.numeroOrcamento,
    dataHoraCadastro: orcamento.dataHoraCadastro.toISOString(),
    dataHoraPdf: orcamento.dataHoraPdf?.toISOString() ?? null,
    status: orcamento.status,
    nomeCliente: orcamento.nomeCliente,
    telefoneCliente: orcamento.telefoneCliente,
    enderecoObra: orcamento.enderecoObra,
    tipoObra: orcamento.tipoObra,
    observacoes: orcamento.observacoes,
    formaEntrega: orcamento.formaEntrega,
    freteIncluso: orcamento.freteIncluso,
    valorTotal: orcamento.valorTotal === null ? null : Number(orcamento.valorTotal),
    observacoesEntrega: orcamento.observacoesEntrega,
    idVendedor: orcamento.idVendedor,
    cliente: clienteFromJson ?? {
      nome: orcamento.nomeCliente,
      telefone: orcamento.telefoneCliente ?? '',
      endereco: orcamento.enderecoObra ?? '',
      cidade: '',
    },
    lajes: itens,
    itens,
    parametros: orcamento.parametrosJson ?? {},
    calculos: orcamento.calculosJson ?? [],
    total: orcamento.totalJson ?? { valor: Number(orcamento.valorTotal ?? 0) },
  };
}

export function normalizeMaterialInput(data: Record<string, unknown>) {
  return {
    material: String(data.nome ?? data.material ?? '').trim(),
    imagem: data.imagem ? String(data.imagem) : null,
    unidade: String(data.unidade ?? 'un').trim() || 'un',
    categoria: String(data.categoria ?? 'Padrão').trim() || 'Padrão',
    valorUnitario: parseNumber(data.preco ?? data.valorUnitario),
    motivo: data.motivo ? String(data.motivo) : null,
    ativo: data.ativo !== false,
  };
}

export function normalizeItemInput(item: Record<string, unknown>, index: number, defaultTipoLaje = 'Treliçada Isopor H8') {
  return {
    descricaoAmbiente: item.descricaoAmbiente ? String(item.descricaoAmbiente) : `Ambiente ${index + 1}`,
    comprimento: parseNumber(item.comprimento),
    largura: parseNumber(item.largura),
    ladoMenor: parseNumber(item.ladoMenor),
    irregular: Boolean(item.irregular),
    quantidade: parsePositiveInteger(item.quantidade, 1),
    sentido: item.sentido ? String(item.sentido) : null,
    tipoLaje: item.tipoLaje ? String(item.tipoLaje) : defaultTipoLaje,
    reforco: Boolean(item.reforco),
    qtdVigotas: item.qtdVigotas === undefined ? null : parsePositiveInteger(item.qtdVigotas, 0),
    qtdLajotas: item.qtdLajotas === undefined ? null : parsePositiveInteger(item.qtdLajotas, 0),
    qtdCimento: item.qtdCimento === undefined ? null : parseNumber(item.qtdCimento),
    qtdAco: item.qtdAco === undefined ? null : parseNumber(item.qtdAco),
    valorMateriais: item.valorMateriais === undefined ? null : parseNumber(item.valorMateriais),
    valorFrete: item.valorFrete === undefined ? null : parseNumber(item.valorFrete),
    valorSubtotal: item.valorSubtotal === undefined ? null : parseNumber(item.valorSubtotal),
    observacoesTecnicas: item.observacoesTecnicas ? String(item.observacoesTecnicas) : null,
    medidasProgressivas: Array.isArray(item.medidasProgressivas) ? item.medidasProgressivas : undefined,
  };
}
