export class BaseResponse<T> {
  statusCode: number;
  data?: T;
  message?: string;
}
