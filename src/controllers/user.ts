import { Request, Response } from 'express';

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  res.json({ msg: 'worked' });
  return;
};
