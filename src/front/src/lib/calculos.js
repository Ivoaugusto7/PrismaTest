import { brNumber, parseNumber, parsePositiveInteger } from './formatters.js';
import { getEnchimento, getIntereixo } from '../constants/lajes.js';

export function arredondamentoCasaLajes(value) {
  const safeValue = Number(value) || 0;
  const inteiro = Math.floor(safeValue);
  const decimal = safeValue - inteiro;
  return decimal <= 0.5 ? inteiro : Math.ceil(safeValue);
}

export function calcularLaje(laje, parametros) {
  const comprimento = Math.max(0, parseNumber(laje.comprimento));
  const largura = Math.max(0, parseNumber(laje.largura));
  const ladoMenor = Math.max(0, parseNumber(laje.ladoMenor));
  const quantidade = parsePositiveInteger(laje.quantidade, 1);
  const intereixoMetros = Math.max(
    0.01,
    parseNumber(parametros.intereixo) / 100 || getIntereixo(parametros.tipoLaje, parametros.enchimento) / 100,
  );
  const capaMetros = Math.max(0, parseNumber(parametros.capaConcreto) / 100 || 0.04);
  const perda = Math.max(0, parseNumber(parametros.perdaTecnica) / 100);

  let areaUnit = comprimento * largura;
  let observacao = 'Laje regular';
  let reducaoPorFaixa = 0;
  let qtdFaixas = largura > 0 ? arredondamentoCasaLajes(largura / intereixoMetros) : 0;
  let medidasProgressivas = [];

  if (laje.irregular && ladoMenor > 0 && largura > ladoMenor) {
    areaUnit = ((largura + ladoMenor) / 2) * comprimento;
    const diferenca = largura - ladoMenor;
    qtdFaixas = largura > 0 ? arredondamentoCasaLajes(largura / intereixoMetros) : 0;
    reducaoPorFaixa = qtdFaixas > 0 ? Number((diferenca / qtdFaixas).toFixed(2)) : 0;
    medidasProgressivas = Array.from({ length: Math.max(qtdFaixas + 1, 0) }, (_, index) => {
      const medida = largura - reducaoPorFaixa * index;
      return Number(Math.max(0, medida).toFixed(2));
    });
    observacao = `Laje irregular: média das larguras (${brNumber(largura)}m e ${brNumber(ladoMenor)}m).`;
  }

  const areaTotal = areaUnit * quantidade;
  const areaComPerda = areaTotal * (1 + perda);
  const concreto = areaTotal * capaMetros;
  const consumoEnchimento = parseNumber(parametros.consumoEnchimentoM2)
    || getEnchimento(parametros.enchimento).consumoM2;
  const pecasEnchimento = Math.ceil(areaTotal * consumoEnchimento);
  const malha = areaTotal / 6;
  const vigotas = Math.max(qtdFaixas, 0) * quantidade;
  const valorMateriais = areaComPerda * parseNumber(parametros.precoM2);

  return {
    areaUnit,
    areaTotal,
    areaComPerda,
    concreto,
    isopor: pecasEnchimento,
    pecasEnchimento,
    tipoEnchimento: parametros.enchimento || 'Isopor (EPS)',
    malha,
    vigotas,
    valorMateriais,
    valorSubtotal: valorMateriais,
    observacao,
    qtdFaixas,
    reducaoPorFaixa,
    medidasProgressivas,
  };
}

export function calcularTotais(calculos, lajes, parametros) {
  const materiais = calculos.reduce((acc, calc) => acc + calc.valorMateriais, 0);
  const frete = Math.max(0, parseNumber(parametros.valorFrete));
  const reforco = Math.max(0, parseNumber(parametros.reforco));

  return {
    area: calculos.reduce((acc, calc) => acc + calc.areaTotal, 0),
    concreto: calculos.reduce((acc, calc) => acc + calc.concreto, 0),
    isopor: calculos.reduce((acc, calc) => acc + calc.isopor, 0),
    pecasEnchimento: calculos.reduce((acc, calc) => acc + (calc.pecasEnchimento ?? calc.isopor), 0),
    tipoEnchimento: parametros.enchimento || 'Isopor (EPS)',
    malha: calculos.reduce((acc, calc) => acc + calc.malha, 0),
    vigotas: calculos.reduce((acc, calc) => acc + calc.vigotas, 0),
    materiais,
    frete,
    reforco,
    valor: materiais + frete + reforco,
    quantidadeLajes: lajes.reduce((sum, item) => sum + parsePositiveInteger(item.quantidade, 1), 0),
  };
}
