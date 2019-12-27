import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PaymentPlanController from './app/controllers/PaymentPlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

/**
 * Payment plans
 */
routes.get('/plans', PaymentPlanController.index);
routes.post('/plans', PaymentPlanController.store);
routes.put('/plans/:id', PaymentPlanController.update);
routes.delete('/plans/:id', PaymentPlanController.delete);

export default routes;
