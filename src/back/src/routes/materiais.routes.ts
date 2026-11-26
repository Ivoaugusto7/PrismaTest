import { Router } from 'express';
import { asyncHandler } from '../utils/http.js';
import {
  bulkCreateMateriais,
  createMaterial,
  deleteMaterial,
  listMateriais,
  updateMaterial,
} from '../controllers/materiais.controller.js';

export const materiaisRouter = Router();

materiaisRouter.get('/', asyncHandler(listMateriais));
materiaisRouter.post('/', asyncHandler(createMaterial));
materiaisRouter.post('/bulk', asyncHandler(bulkCreateMateriais));
materiaisRouter.patch('/:id', asyncHandler(updateMaterial));
materiaisRouter.put('/:id', asyncHandler(updateMaterial));
materiaisRouter.delete('/:id', asyncHandler(deleteMaterial));
