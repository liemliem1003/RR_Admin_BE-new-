import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack || err.message || err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};
