import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PaymentPlanController from './app/controllers/PaymentPlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * Student check-ins
 */
routes.get('/students/:id', StudentController.show);
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.show);

/**
 * Student help orders
 */
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.show);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

/**
 * Payment plans
 */
routes.get('/plans', PaymentPlanController.index);
routes.get('/plans/:id', PaymentPlanController.show);
routes.post('/plans', PaymentPlanController.store);
routes.put('/plans/:id', PaymentPlanController.update);
routes.delete('/plans/:id', PaymentPlanController.delete);

/**
 * Student
 */
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

/**
 * Registration
 */
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.show);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

/**
 * Help orders managed by the gym
 */
routes.get('/help-orders', GymHelpOrderController.index);
routes.put('/help-orders/:id/answer', GymHelpOrderController.update);

export default routes;
