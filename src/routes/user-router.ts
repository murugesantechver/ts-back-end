import { IRouter, Router } from 'express';
import { userLogin } from '../controllers/user';

export const appRouter = (): IRouter => {
  const router: IRouter = Router();

  router.get('/login', userLogin);

  return router;
};
