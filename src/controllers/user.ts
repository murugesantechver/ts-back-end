import { Request, Response } from 'express';
import { userCollection } from '../config/mongodb';

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
  const newUser = new userCollection({ name, email, password, role });
  const savedUser = await newUser.save();
  //const users = await userCollection.find();
  res.json(savedUser);
  return;
};
