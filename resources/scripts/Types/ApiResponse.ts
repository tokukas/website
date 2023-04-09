export type ApiResponse<T = unknown> = {
  status: 'success' | 'fail';
  status_code: number;
  message: string;
  data?: T;
};
