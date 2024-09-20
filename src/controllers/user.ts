import { Request, Response } from 'express';
import { userCollection } from '../config/mongodb';
import { redisClient } from '..';

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;
  const newUser = new userCollection({ name, email, password, role });
  const savedUser = await newUser.save();
  //const users = await userCollection.find();
  res.json(savedUser);
  return;
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userCollection.find();
  res.json(users);
  return;
};

export const redisSample = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cachedValue = await redisClient.get('getUsers');
  if (cachedValue) {
    res.json({ data: JSON.parse(cachedValue), msg: 'data from redis' });
  } else {
    const users = await userCollection.find();
    redisClient.set('getUsers', JSON.stringify(users), {
      EX: 10,
    });
    res.json({ data: users, msg: 'data from db after set' });
  }
};
