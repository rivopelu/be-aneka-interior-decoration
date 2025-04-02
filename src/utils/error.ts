import { HTTP_STATUS } from '../constants/HttpStatus.js';

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request') {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal server error') {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}
