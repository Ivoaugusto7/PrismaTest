import { Router } from 'express';
import { asyncHandler } from '../utils/http.js';
import {
  calcularPreviewOrcamento,
  clearOrcamentos,
  createOrcamento,
  deleteOrcamento,
  getOrcamento,
  listOrcamentos,
  updateStatus,
} from '../controllers/orcamentos.controller.js';

export const orcamentosRouter = Router();

orcamentosRouter.get('/', asyncHandler(listOrcamentos));
orcamentosRouter.post('/', asyncHandler(createOrcamento));
orcamentosRouter.delete('/', asyncHandler(clearOrcamentos));
orcamentosRouter.post('/calcular', asyncHandler(calcularPreviewOrcamento));
orcamentosRouter.get('/:id', asyncHandler(getOrcamento));
orcamentosRouter.patch('/:id/status', asyncHandler(updateStatus));
orcamentosRouter.delete('/:id', asyncHandler(deleteOrcamento));
