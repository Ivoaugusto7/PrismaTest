import { parseNumber } from './formatters.js';

export function onlyDigits(value) {
  return String(value ?? '').replace(/\D/g, '');
}

export function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isValidPhone(value) {
  const digits = onlyDigits(value);
  return digits.length === 0 || digits.length === 10 || digits.length === 11;
}

export function formatDecimal(value, digits = 2) {
  const parsed = parseNumber(value);
  if (!Number.isFinite(parsed)) return '';
  return parsed.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatInteger(value, fallback = 1) {
  const parsed = parseInt(onlyDigits(value), 10);
  return String(Number.isFinite(parsed) && parsed >= fallback ? parsed : fallback);
}
