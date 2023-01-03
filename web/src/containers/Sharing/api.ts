import { GET, POST, PUT, DELETE } from "@/src/service";
import { PageParams } from "@/src/tb.types";
import type { AddSharingParam } from "containers/Sharing/type";

export const getCategoriesApi = () => GET('categories/list')
export const getSharingListApi = (data: PageParams) => GET('blog/list', data)
export const addSharingApi = (data: AddSharingParam) => POST('blog/add', data)
export const updateSharingApi = (data: any) => PUT('blog/update', data)
export const deleteSharingApi = (id: string) => DELETE('blog/delete', { id })
