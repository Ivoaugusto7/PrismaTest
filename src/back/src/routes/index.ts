import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { materiaisRouter } from './materiais.routes.js';
import { orcamentosRouter } from './orcamentos.routes.js';
import { parametrosRouter } from './parametros.routes.js';
import { vendedoresRouter } from './vendedores.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/materiais', materiaisRouter);
apiRouter.use('/orcamentos', orcamentosRouter);
apiRouter.use('/parametros', parametrosRouter);
apiRouter.use('/vendedores', vendedoresRouter);
