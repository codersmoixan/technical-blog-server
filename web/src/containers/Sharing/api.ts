import { GET, POST, PUT, DELETE } from "@/src/service";
import { PageParams } from "@/src/tb.types";

export const getCategoriesApi = () => GET('categories/list')
export const getShareListApi = (data: PageParams) => GET('blog/list', data)
export const addShareApi = (data: any) => POST('blog/add', data)
export const updateShareApi = (data: any) => PUT('blog/update', data)
export const deleteShareApi = (id: string) => DELETE('blog/delete', { id })
