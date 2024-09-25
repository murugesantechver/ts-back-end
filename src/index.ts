import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { loadEnvironment } from './utils/core.utils';
import { userRouter } from './routes/user-router';
import Http, { Server } from 'http';
import { logger } from './utils/logger.utils';
import { NodeEnv } from './types/enums';
// import { createClient } from 'redis';

dotenv.config();

loadEnvironment();

const app: Application = express();
const port = process.env.PORT || 3000;
const corsAllowSubdomains = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  cors({ origin: '*' })(req, res, next);
  return;
};

connectDB();
/* 
const redisHost = process.env.REDIS_HOST;
const redisPort = parseInt(process.env.REDIS_PORT as string, 10);
const redisPassword =
  process.env.NODE_ENV === NodeEnv.PROD
    ? process.env.REDIS_PASSWORD_LIVE
    : process.env.REDIS_PASSWORD_LOCAL || undefined;

const redisClient = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
  password: redisPassword,
});

redisClient
  .connect()
  .then(() => {
    logger.info(`Connected to Redis on ${redisHost}:${redisPort}`);
  })
  .catch((err) => {
    logger.error('Redis connection error:', err);
  });

export { redisClient }; */

app.use(express.urlencoded({ extended: false }));
app.use(corsAllowSubdomains);

app.use(express.json());

const server = Http.createServer(app);
server.setTimeout(600000);

app.use('/user', userRouter());

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'No route found for this request.',
    status: 404,
  });
});

server.listen(port);
server.on('error', (error) => onError(error, port));
server.on('listening', () => onListening(server));

function onError(
  error: NodeJS.ErrnoException,
  port: string | number | boolean
): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening(server: Server): void {
  const addr = server.address();
  if (!addr) return;
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(
    `Server running as ${process.env.NODE_ENV === NodeEnv.PROD ? NodeEnv.PROD : NodeEnv.DEV} mode on ${bind}.`
  );
}
