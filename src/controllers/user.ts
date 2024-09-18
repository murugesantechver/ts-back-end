import { Request, Response } from 'express';
import { userCollection } from '../config/mongodb';

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  const users = await userCollection.find();
  res.json(users);
  return;
};
