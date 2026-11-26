import { parseNumber, parsePositiveInteger } from './formatters.js';

function isBlank(value) {
  return !String(value ?? '').trim();
}

export function validateOrcamento(cliente, lajes, parametros) {
  const errors = [];

  if (isBlank(cliente.nome)) errors.push('Informe o nome do cliente.');
  if (isBlank(cliente.cidade)) errors.push('Informe a cidade da obra.');
  if (!Array.isArray(lajes) || lajes.length === 0) errors.push('Informe pelo menos um ambiente/laje.');

  lajes.forEach((laje, index) => {
    const label = laje.ambiente?.trim() || `Ambiente ${index + 1}`;
    const comprimento = parseNumber(laje.comprimento);
    const largura = parseNumber(laje.largura);
    const ladoMenor = parseNumber(laje.ladoMenor);
    const quantidade = parsePositiveInteger(laje.quantidade, 1);

    if (isBlank(laje.ambiente)) errors.push(`Informe o nome do ${label}.`);
    if (comprimento <= 0) errors.push(`${label}: comprimento deve ser maior que zero.`);
    if (largura <= 0) errors.push(`${label}: largura maior deve ser maior que zero.`);
    if (quantidade < 1) errors.push(`${label}: quantidade deve ser pelo menos 1.`);

    if (laje.irregular) {
      if (ladoMenor <= 0) errors.push(`${label}: informe a largura menor da laje irregular.`);
      if (ladoMenor >= largura) errors.push(`${label}: largura menor precisa ser menor que a largura maior.`);
    }
  });

  if (parseNumber(parametros.capaConcreto) <= 0) errors.push('Capa de concreto deve ser maior que zero.');
  if (parseNumber(parametros.intereixo) <= 0) errors.push('Intereixo deve ser maior que zero.');
  if (parseNumber(parametros.perdaTecnica) < 0) errors.push('Perda técnica não pode ser negativa.');
  if (parseNumber(parametros.precoM2) < 0) errors.push('Preço visual por m² não pode ser negativo.');
  if (parseNumber(parametros.valorFrete) < 0) errors.push('Frete não pode ser negativo.');
  if (parseNumber(parametros.reforco) < 0) errors.push('Reforço não pode ser negativo.');

  return errors;
}
