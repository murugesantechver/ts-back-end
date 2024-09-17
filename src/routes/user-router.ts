import { IRouter, Router } from 'express';
import { userLogin } from '../controllers/user';

export const userRouter = (): IRouter => {
  const router: IRouter = Router();

  router.get('/login', userLogin);

  return router;
};
