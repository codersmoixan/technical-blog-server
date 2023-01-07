import { DELETE, GET, POST, PUT } from "@/src/service";

export const getCategoryApi = () => GET('category/list')
export const addCategoryApi = (data: any) => POST('category/add', data)
export const updateCategoryApi = (data: any) => PUT('category/update', data)
export const deleteCategoryApi = (data: any) => DELETE('category/delete', data)
