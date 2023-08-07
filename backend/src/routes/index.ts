import { Router } from 'express';
import studentRouter from './StudentRoutes';

const routes = Router();

const urlPrefix = '/api/v1';

routes.use(`${urlPrefix}/student`, studentRouter);

export default routes;
