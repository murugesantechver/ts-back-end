import { IRouter, Router } from 'express';
import { getUsers, userLogin } from '../controllers/user';

export const userRouter = (): IRouter => {
  const router: IRouter = Router();

  router.get('/login', userLogin);
  router.get('/all', getUsers);

  return router;
};
