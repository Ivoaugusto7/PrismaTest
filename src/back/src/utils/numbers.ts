export function parseNumber(value: unknown): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (value === null || value === undefined) return 0;

  const raw = String(value).trim();
  if (!raw) return 0;

  const hasComma = raw.includes(',');
  const normalized = hasComma
    ? raw.replace(/\./g, '').replace(',', '.')
    : raw;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parsePositiveInteger(value: unknown, fallback = 1): number {
  const parsed = Math.floor(parseNumber(value));
  return parsed > 0 ? parsed : fallback;
}

export function round(value: number, places = 2): number {
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
