export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: PaginationOrder;
}

export enum PaginationOrder {
  Ascending = 'asc',
  Descending  = 'dsc',
}
