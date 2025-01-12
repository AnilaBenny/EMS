import { Request, Response, NextFunction } from 'express';
import logger from './logger';

function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info('Incoming Request: %s %s', req.method, req.url);
  next();
}

export default requestLogger;
