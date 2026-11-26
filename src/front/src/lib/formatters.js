export function brNumber(value, digits = 2) {
  return Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function money(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function parseNumber(value) {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;

  const text = String(value).trim();
  if (!text) return 0;

  const hasComma = text.includes(',');
  const normalized = hasComma
    ? text.replace(/\./g, '').replace(',', '.')
    : text;

  return Number(normalized) || 0;
}

export function parsePositiveInteger(value, fallback = 1) {
  const parsed = parseInt(value || fallback, 10);
  return Number.isFinite(parsed) ? Math.max(fallback, parsed) : fallback;
}
