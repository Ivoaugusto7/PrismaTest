import { Router } from 'express';
import { asyncHandler } from '../utils/http.js';
import { createParametroCalculo, listParametrosCalculo } from '../controllers/parametros.controller.js';

export const parametrosRouter = Router();

parametrosRouter.get('/calculo', asyncHandler(listParametrosCalculo));
parametrosRouter.post('/calculo', asyncHandler(createParametroCalculo));
