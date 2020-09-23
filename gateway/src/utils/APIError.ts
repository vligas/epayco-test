// eslint-disable-next-line max-classes-per-file
import httpStatus, { HttpStatus } from 'http-status';

export interface ExtendableErrorOptions {
  message: string
  errors: string[]
  status: number
  isPublic: boolean
  stack?: string
}

class ExtendableError extends Error {
  errors: string[]
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
    // Error.captureStackTrace(this, this.constructor.name);
  }
}


export interface APIErrorOptions {
  message: string
  errors?: string[]
  status?: number
  isPublic?: boolean
  stack?: string
}

class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
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
