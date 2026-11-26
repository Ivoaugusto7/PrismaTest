export const TIPOS_LAJE = [
  { value: 'TR8', label: 'TR8', altura: 'H8 + capa', painel: false },
  { value: 'TR10', label: 'TR10', altura: 'H10 + capa', painel: false },
  { value: 'TR12', label: 'TR12', altura: 'H12 + capa', painel: false },
  { value: 'Painel TR8', label: 'Painel TR8', altura: 'H8 + capa', painel: true },
  { value: 'Painel TR12', label: 'Painel TR12', altura: 'H12 + capa', painel: true },
  { value: 'Painel TR16', label: 'Painel TR16', altura: 'H16 + capa', painel: true },
];

export const ENCHIMENTOS = [
  { value: 'Isopor (EPS)', label: 'Isopor (EPS)', consumoM2: 2.4 },
  { value: 'Tijolo', label: 'Tijolo / cerâmica', consumoM2: 11 },
];

export function getTipoLaje(value) {
  return TIPOS_LAJE.find((tipo) => tipo.value === value) ?? TIPOS_LAJE[0];
}

export function getEnchimento(value) {
  return ENCHIMENTOS.find((item) => item.value === value) ?? ENCHIMENTOS[0];
}

export function getIntereixo(tipoLaje, enchimento) {
  if (getTipoLaje(tipoLaje).painel) return 25;
  return getEnchimento(enchimento).value === 'Tijolo' ? 45 : 42;
}
