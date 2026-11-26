import { STORAGE_KEYS, defaultMaterials } from '../constants/defaults.js';
import { loadJson, saveJson } from '../lib/storage.js';
import { ApiNotConfiguredError, isApiConfigured, request, USE_LOCAL_FALLBACK } from './apiClient.js';
import { fromApiMaterial, toApiMaterial } from './mappers.js';

function localList() {
  return loadJson(STORAGE_KEYS.materiais, defaultMaterials);
}

function shouldFallback(error) {
  return USE_LOCAL_FALLBACK && (error instanceof ApiNotConfiguredError || !isApiConfigured() || error.name === 'AbortError' || error.name === 'ApiRequestError' || error instanceof TypeError);
}

export async function listMateriais() {
  try {
    const data = await request('/materiais');
    const records = Array.isArray(data) ? data : data?.items || [];
    return { data: records.map(fromApiMaterial), source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    return { data: localList(), source: 'local', warning: error.message };
  }
}

export async function createMaterial(material) {
  try {
    const data = await request('/materiais', {
      method: 'POST',
      body: JSON.stringify(toApiMaterial(material)),
    });
    return { data: fromApiMaterial(data || material), source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    const next = [...localList(), material];
    saveJson(STORAGE_KEYS.materiais, next);
    return { data: material, source: 'local', warning: error.message };
  }
}

export async function bulkCreateMateriais(materiais) {
  try {
    const data = await request('/materiais/bulk', {
      method: 'POST',
      body: JSON.stringify({ materiais: materiais.map(toApiMaterial) }),
    });
    const records = Array.isArray(data) ? data : data?.items || materiais;
    return { data: records.map(fromApiMaterial), source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    const next = [...localList(), ...materiais];
    saveJson(STORAGE_KEYS.materiais, next);
    return { data: materiais, source: 'local', warning: error.message };
  }
}

export async function deleteMaterial(id) {
  try {
    await request(`/materiais/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return { source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    const next = localList().filter((item) => String(item.id) !== String(id));
    saveJson(STORAGE_KEYS.materiais, next);
    return { source: 'local', warning: error.message };
  }
}

export async function updateMaterial(id, material) {
  try {
    const data = await request(`/materiais/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(toApiMaterial(material)),
    });
    return { data: fromApiMaterial(data), source: 'api' };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    const next = localList().map((item) => String(item.id) === String(id) ? { ...item, ...material, id } : item);
    saveJson(STORAGE_KEYS.materiais, next);
    return { data: { ...material, id }, source: 'local', warning: error.message };
  }
}
