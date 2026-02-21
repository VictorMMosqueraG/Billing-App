export interface PaginatedResponse<T> {
  success:  boolean;
  message:  string;
  results:  T;
  total:    number;
  page:     number;
  pageSize: number;
}
