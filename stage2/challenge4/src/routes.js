import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
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

/**
 * Student
 */
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

export default routes;
