import { GET, POST, PUT, DELETE } from "@/src/service";

export const getCategoriesApi = () => GET('categories/list')
export const getShareListApi = () => GET('blog/list')
export const addShareApi = (data: any) => POST('blog/add', data)
export const updateShareApi = (data: any) => PUT('blog/update', data)
export const deleteShareApi = (id: string) => DELETE('blog/delete', { id })
