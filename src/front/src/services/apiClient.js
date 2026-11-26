const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS || 8000);
export const USE_LOCAL_FALLBACK = String(import.meta.env.VITE_USE_LOCAL_FALLBACK ?? 'true') !== 'false';

export class ApiNotConfiguredError extends Error {
  constructor() {
    super('API REST não configurada. Defina VITE_API_BASE_URL para persistir no back-end.');
    this.name = 'ApiNotConfiguredError';
  }
}

export class ApiRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

export function isApiConfigured() {
  return Boolean(API_BASE_URL);
}

export async function request(path, options = {}) {
  if (!API_BASE_URL) throw new ApiNotConfiguredError();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new ApiRequestError(data?.message || `Erro HTTP ${response.status}`, response.status);
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}
