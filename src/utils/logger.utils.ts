import winston from 'winston';
import { NodeEnv } from '../types/enums';
import { Request, Response } from 'express';

const customFormatter = winston.format((info: any) => {
  if (info instanceof Error) {
    const data =
      info.stack
        ?.toString()
        .replace(/Error: /gi, '')
        .replace(/\s+/gi, ' ')
        .replace(/\n/gi, '') || {};
    info.message = data.toString();
    return info;
  }

  return info;
});

const formatter = (): winston.Logform.Format => {
  return winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    customFormatter(),
    winston.format.simple()
  );
};

export const logger = winston.createLogger({
  level: 'debug',
  format: formatter(),
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === NodeEnv.PROD) {
  const prodConfig = new winston.transports.Console({
    format: formatter(),
    level: 'warn',
  });

  logger.add(prodConfig);
}

export const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any
) => {
  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      body: responseBody,
    },
  };
};
