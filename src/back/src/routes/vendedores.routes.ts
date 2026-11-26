import { Router } from 'express';
import { asyncHandler } from '../utils/http.js';
import { createVendedor, listVendedores } from '../controllers/vendedores.controller.js';

export const vendedoresRouter = Router();

vendedoresRouter.get('/', asyncHandler(listVendedores));
vendedoresRouter.post('/', asyncHandler(createVendedor));
