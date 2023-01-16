export type EmptyObject<Key extends string | number = string | number, T = any> = {
  [K in Key]: T;
};

export type GetObjectValue<T = any> = {
  [K: string]: T
}

export interface PageParams {
  pageSize: number;
  page: number;
}
