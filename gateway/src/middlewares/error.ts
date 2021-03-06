import httpStatus from 'http-status';
import APIError from '../utils/APIError';
import { env } from '../config/env';
import logger from '../config/logger';
import { NextFunction, Request, Response } from 'express';
import { AxiosError } from 'axios'
import { ValidationError } from 'class-validator';


interface ErrorResponse {
  code: number,
  message: string,
  errors: ValidationError[],
  stack?: string,
}

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (err: APIError, req: Request, res: Response) => {
  logger.error(err.message, err.stack);
  const response: ErrorResponse = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = async (err: Error | APIError | AxiosError, req: Request, res: Response, next: NextFunction) => {
  logger.info(err)
  if (err !== null && !err) {
    return next()
  }

  let convertedError = err;
  if (
    err.message.includes('ENOTFOUND') ||
    err.message.includes('Failed to connect') ||
    err.message.includes('Failed to cancel request') ||
    err.message.includes('ECONNREFUSED')
  ) {
    convertedError = new APIError({
      message: 'Connection Error',
      status: httpStatus.SERVICE_UNAVAILABLE,
      stack: err.stack
    });
  }
  else if ((err as AxiosError).response) {
    res.status((err as AxiosError)?.response?.status as number)
    res.send((err as AxiosError).response?.data)
    return
  }
  else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      stack: err.stack,
    });
  }

  return handler(convertedError as APIError, req, res);
};


export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};




