import { IRouter, Router } from 'express';
import {
  getUsers,
  /* redisSample, */
  userLogin,
  userRegister,
} from '../controllers/user';
import { verifyToken } from '../middleware/authMiddleware';

export const userRouter = (): IRouter => {
  const router: IRouter = Router();

  router.post('/register', userRegister);
  router.post('/login', userLogin);
  router.get('/all', verifyToken, getUsers);
  // router.get('/redis', redisSample);

  return router;
};
