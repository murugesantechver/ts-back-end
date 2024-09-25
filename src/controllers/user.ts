import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userCollection } from '../config/mongodb';
// import { redisClient } from '..';
import { logger } from '../utils/logger.utils';
import { JWTDecoded } from '../types/interfaces';
import { JwtAuth } from '../types/enums';

export const userRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userCollection({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error(error);
    res.json({ status: false, err: error });
  }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }
    const token = jwt.sign({ userId: user._id }, JwtAuth.key, {
      expiresIn: JwtAuth.expiresIn,
    });
    res.status(200).json({ token });
    0;
  } catch (error) {}
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const decodedTokenData = <JWTDecoded>req.decodedToken;
  console.log('decodedToken :: ', decodedTokenData);

  const users = await userCollection.find();
  res.json(users);
  return;
};

/* export const redisSample = async (
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
}; */
