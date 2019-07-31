import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.send('Node Challenge 2'));

export default routes;
