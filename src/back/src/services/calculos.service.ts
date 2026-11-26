import { parseNumber, parsePositiveInteger, round } from '../utils/numbers.js';

export type LajeInput = {
  ambiente?: string;
  descricaoAmbiente?: string;
  comprimento?: unknown;
  largura?: unknown;
  ladoMenor?: unknown;
  quantidade?: unknown;
  irregular?: boolean;
  sentido?: string;
};

export type ParametrosCalculoInput = {
  tipoLaje?: string;
  enchimento?: string;
  capaConcreto?: unknown;
  intereixo?: unknown;
  perdaTecnica?: unknown;
  precoM2?: unknown;
  valorFrete?: unknown;
  reforco?: unknown;
};

export type CalculoLaje = {
  areaUnit: number;
  areaTotal: number;
  areaComPerda: number;
  concreto: number;
  isopor: number;
  malha: number;
  vigotas: number;
  valorMateriais: number;
  valorSubtotal: number;
  observacao: string;
  qtdFaixas: number;
  reducaoPorFaixa: number;
  medidasProgressivas: number[];
};

export function arredondamentoCasaLajes(value: number): number {
  const safeValue = Number(value) || 0;
  const inteiro = Math.floor(safeValue);
  const decimal = safeValue - inteiro;
  return decimal <= 0.5 ? inteiro : Math.ceil(safeValue);
}

function resolveIntereixo(parametros: ParametrosCalculoInput): number {
  const explicit = parseNumber(parametros.intereixo);
  if (explicit > 0) return explicit / 100;

  const enchimento = String(parametros.enchimento || '').toLowerCase();
  if (enchimento.includes('tijolo') || enchimento.includes('cerâmica') || enchimento.includes('ceramica')) {
    return 0.45;
  }

  return 0.42;
}

export function calcularLaje(laje: LajeInput, parametros: ParametrosCalculoInput): CalculoLaje {
  const comprimento = Math.max(0, parseNumber(laje.comprimento));
  const largura = Math.max(0, parseNumber(laje.largura));
  const ladoMenor = Math.max(0, parseNumber(laje.ladoMenor));
  const quantidade = parsePositiveInteger(laje.quantidade, 1);
  const intereixoMetros = Math.max(0.01, resolveIntereixo(parametros));
  const capaMetros = Math.max(0, parseNumber(parametros.capaConcreto) / 100 || 0.04);
  const perda = Math.max(0, parseNumber(parametros.perdaTecnica) / 100);

  let areaUnit = comprimento * largura;
  let observacao = 'Laje regular';
  let reducaoPorFaixa = 0;
  let qtdFaixas = largura > 0 ? arredondamentoCasaLajes(largura / intereixoMetros) : 0;
  let medidasProgressivas: number[] = [];

  if (laje.irregular && ladoMenor > 0 && largura > ladoMenor) {
    areaUnit = ((largura + ladoMenor) / 2) * comprimento;
    const diferenca = largura - ladoMenor;
    qtdFaixas = largura > 0 ? arredondamentoCasaLajes(largura / intereixoMetros) : 0;
    reducaoPorFaixa = qtdFaixas > 0 ? round(diferenca / qtdFaixas, 2) : 0;
    medidasProgressivas = Array.from({ length: Math.max(qtdFaixas + 1, 0) }, (_, index) => {
      const medida = largura - reducaoPorFaixa * index;
      return round(Math.max(0, medida), 2);
    });
    observacao = `Laje irregular: média das larguras (${round(largura, 2)}m e ${round(ladoMenor, 2)}m).`;
  }

  const areaTotal = areaUnit * quantidade;
  const areaComPerda = areaTotal * (1 + perda);
  const concreto = areaTotal * capaMetros;
  const isopor = Math.ceil(areaTotal * 2.4);
  const malha = areaTotal / 6;
  const vigotas = Math.max(qtdFaixas, 0) * quantidade;
  const valorMateriais = areaComPerda * parseNumber(parametros.precoM2);

  return {
    areaUnit: round(areaUnit, 3),
    areaTotal: round(areaTotal, 3),
    areaComPerda: round(areaComPerda, 3),
    concreto: round(concreto, 3),
    isopor,
    malha: round(malha, 3),
    vigotas,
    valorMateriais: round(valorMateriais, 2),
    valorSubtotal: round(valorMateriais, 2),
    observacao,
    qtdFaixas,
    reducaoPorFaixa,
    medidasProgressivas,
  };
}

export function calcularTotais(calculos: CalculoLaje[], lajes: LajeInput[], parametros: ParametrosCalculoInput) {
  const materiais = calculos.reduce((acc, calc) => acc + calc.valorMateriais, 0);
  const frete = Math.max(0, parseNumber(parametros.valorFrete));
  const reforco = Math.max(0, parseNumber(parametros.reforco));

  return {
    area: round(calculos.reduce((acc, calc) => acc + calc.areaTotal, 0), 3),
    concreto: round(calculos.reduce((acc, calc) => acc + calc.concreto, 0), 3),
    isopor: calculos.reduce((acc, calc) => acc + calc.isopor, 0),
    malha: round(calculos.reduce((acc, calc) => acc + calc.malha, 0), 3),
    vigotas: calculos.reduce((acc, calc) => acc + calc.vigotas, 0),
    materiais: round(materiais, 2),
    frete: round(frete, 2),
    reforco: round(reforco, 2),
    valor: round(materiais + frete + reforco, 2),
    quantidadeLajes: lajes.reduce((sum, item) => sum + parsePositiveInteger(item.quantidade, 1), 0),
  };
}

export function calcularOrcamento(lajes: LajeInput[], parametros: ParametrosCalculoInput) {
  const calculos = lajes.map((laje) => calcularLaje(laje, parametros));
  const total = calcularTotais(calculos, lajes, parametros);

  const itens = lajes.map((laje, index) => {
    const calc = calculos[index];

    return {
      descricaoAmbiente: laje.ambiente ?? laje.descricaoAmbiente ?? `Ambiente ${index + 1}`,
      comprimento: parseNumber(laje.comprimento),
      largura: parseNumber(laje.largura),
      ladoMenor: parseNumber(laje.ladoMenor),
      irregular: Boolean(laje.irregular),
      quantidade: parsePositiveInteger(laje.quantidade, 1),
      sentido: laje.sentido ?? 'Menor vão',
      tipoLaje: parametros.tipoLaje ?? 'Treliçada Isopor H8',
      reforco: parseNumber(parametros.reforco) > 0,
      qtdVigotas: calc.vigotas,
      qtdLajotas: calc.isopor,
      qtdCimento: calc.concreto,
      qtdAco: calc.malha,
      valorMateriais: calc.valorMateriais,
      valorFrete: index === 0 ? total.frete : 0,
      valorSubtotal: calc.valorSubtotal,
      observacoesTecnicas: calc.observacao,
      medidasProgressivas: calc.medidasProgressivas,
    };
  });

  return { calculos, total, itens };
}
