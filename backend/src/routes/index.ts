import { Router } from 'express';
import studentRouter from './StudentRoute';

const routes = Router();

const urlPrefix = '/api/v1';

routes.use(`${urlPrefix}/student`, studentRouter);

export default routes;
