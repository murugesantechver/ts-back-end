import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      decodedToken: { [key: string]: any };
    }
  }
}
