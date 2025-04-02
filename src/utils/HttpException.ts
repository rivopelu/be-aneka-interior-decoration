// src/exceptions/HttpException.ts

export class HttpException extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpException);
    }
  }
}
