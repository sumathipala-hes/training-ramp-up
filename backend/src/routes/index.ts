import { Router } from 'express';
import studentRouter from './student.routes';
import userRouter from './user.routes';

const routes = Router();

const urlPrefix = '/api/v1';

routes.use(`${urlPrefix}/student`, studentRouter);
routes.use(`${urlPrefix}/user`, userRouter);

export default routes;
