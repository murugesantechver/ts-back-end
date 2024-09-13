import { Request, Response } from 'express';
import { formatHTTPLoggerResponse, logger } from '../utils/logger.utils';

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  res.json({ msg: 'worked' });
  // logger.info(
  //   'Success message',
  //   formatHTTPLoggerResponse(req, res, { msg: 'worked' })
  // );
  return;
};
