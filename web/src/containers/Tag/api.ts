import { DELETE, GET, POST, PUT } from "@/src/service";

export const getTagListApi = () => GET('tag/list')
export const addTagApi = (data: any) => POST('tag/add', data)
export const updateTagApi = (data: any) => PUT('tag/update', data)
export const deleteTagApi = (data: any) => DELETE('tag/delete', data)
