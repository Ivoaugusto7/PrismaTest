import { STORAGE_KEYS } from '../constants/defaults.js';
import { loadJson, saveJson } from '../lib/storage.js';
import { ApiNotConfiguredError, isApiConfigured, request, USE_LOCAL_FALLBACK } from './apiClient.js';
import { fromApiOrcamento, toApiOrcamento } from './mappers.js';

function localList() {
  return loadJson(STORAGE_KEYS.orcamentos, []);
}

function shouldFallback(error) {
  return USE_LOCAL_FALLBACK && (error instanceof ApiNotConfiguredError || !isApiConfigured() || error.name === 'AbortError' || error.name === 'ApiRequestError' || error instanceof TypeError);
}

export function getPersistenceMode() {
  if (!isApiConfigured()) return 'local';
  return USE_LOCAL_FALLBACK ? 'api-com-fallback-local' : 'api';
}

export async function listOrcamentos() {
  try {
    const data = await request('/orcamentos');
    const records = Array.isArray(data) ? data : data?.items || [];
    return { data: records.map(fromApiOrcamento), source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    return { data: localList(), source: 'local', warning: error.message };
  }
}

export async function createOrcamento(record) {
  try {
    const data = await request('/orcamentos', {
      method: 'POST',
      body: JSON.stringify(toApiOrcamento(record)),
    });
    return { data: fromApiOrcamento(data || record), source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    const next = [record, ...localList()];
    saveJson(STORAGE_KEYS.orcamentos, next);
    return { data: record, source: 'local', warning: error.message };
  }
}

export async function calcularOrcamento(lajes, parametros) {
  const data = await request('/orcamentos/calcular', {
    method: 'POST',
    body: JSON.stringify({ lajes, parametros }),
  });
  return { data, source: 'api' };
}

export async function clearOrcamentos() {
  try {
    await request('/orcamentos', { method: 'DELETE' });
    return { source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    saveJson(STORAGE_KEYS.orcamentos, []);
    return { source: 'local', warning: error.message };
  }
}
