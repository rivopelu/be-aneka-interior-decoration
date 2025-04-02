import { BaseResponse } from '../types/response/BaseResponse';

export class ResponseHelper {
  static success<T>(message: string, data?: T): BaseResponse<T> {
    return { success: true, message, data };
  }

  static paginated<T>(
    message: string,
    data: T,
    total: number,
    page: number,
    pageSize: number,
  ): BaseResponse<T> {
    return {
      success: true,
      message,
      data,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  static error(message: string): BaseResponse<null> {
    return { success: false, message };
  }
}
