import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger.utils';
import { JwtAuth } from '../types/enums';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Access denied' });

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, JwtAuth.key);
    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      typeof decoded === 'string'
    ) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.decodedToken = decoded;
    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ error: 'Invalid token due to error' });
  }
};
