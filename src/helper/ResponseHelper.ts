import { Response } from 'express';
import { BaseResponse } from '../types/response/BaseResponse';

export class ResponseHelper {
  static success(message: string): BaseResponse<null> {
    return { success: true, message };
  }

  static data<T>(data: T, message: string = 'success'): BaseResponse<T> {
    return { success: true, message, response_data: data };
  }

  static paginated<T>(
    data: T,
    totalData: number,
    page: number,
    size: number,
    message: string = 'success',
  ): BaseResponse<T> {
    return {
      success: true,
      message,
      response_data: data,
      paginated_data: {
        page,
        size,
        total_data: totalData,
        page_count: Math.ceil(totalData / size),
      },
    };
  }

  static error(message: string): BaseResponse<null> {
    return { success: false, message };
  }

  static sendSuccess(res: Response, message: string, statusCode = 200): void {
    res.status(statusCode).json(this.success(message));
  }

  static sendData<T>(res: Response, data: T, statusCode = 200): void {
    res.status(statusCode).json(this.data(data));
  }

  static sendPaginated<T>(
    res: Response,
    data: T,
    totalData: number,
    page: number,
    size: number,
    statusCode = 200,
    message: string = '',
  ): void {
    res
      .status(statusCode)
      .json(this.paginated(data, totalData, page, size, message));
  }

  static sendError(res: Response, message: string, statusCode = 400): void {
    res.status(statusCode).json(this.error(message));
  }
}
