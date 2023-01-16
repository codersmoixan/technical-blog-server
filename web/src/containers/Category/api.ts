import { DELETE, GET, POST, PUT } from "@/src/service";
import type { AddOrUpdateCategoryParam } from "./types"

export const getCategoryApi = () => GET('category/list')
export const addCategoryApi = (data: AddOrUpdateCategoryParam) => POST('category/add', data)
export const updateCategoryApi = (data: AddOrUpdateCategoryParam) => PUT('category/update', data)
export const deleteCategoryApi = (id: string) => DELETE('category/delete', { id })
