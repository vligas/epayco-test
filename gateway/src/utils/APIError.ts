import { ValidationError } from 'class-validator';
// eslint-disable-next-line max-classes-per-file
import httpStatus, { HttpStatus } from 'http-status';

export interface ExtendableErrorOptions {
  message: string
  errors: ValidationError[]
  status: number
  isPublic: boolean
  stack?: string
}

class ExtendableError extends Error {
  errors: ValidationError[]
  status: number
  isPublic: boolean
  stack?: string
  isOperational = true;

  constructor({ message, errors, status, isPublic, stack }: ExtendableErrorOptions) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
  }
}


export interface APIErrorOptions {
  message: string
  errors?: ValidationError[]
  status?: number
  isPublic?: boolean
  stack?: string
}

class APIError extends ExtendableError {
  constructor({
    message,
    errors = [],
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }: APIErrorOptions) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}

export default APIError;
