export interface AppResponse<T> {
  data?: T;
}

export interface AppListResponse<T> {
  data?: DatList<T>;
}

export interface DatList<T> {
  items: T[];
  totalItems: number;
}
