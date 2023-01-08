import useReactQuery from "hooks/common/useReactQuery";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoryApi,
  updateCategoryApi,
  AddOrUpdateCategoryParam
} from "api/category";
import { useMutation } from "@tanstack/react-query";

export enum CATEGORY_QUERY_KEY {
  GET = 'category.get',
  ADD = 'category.add',
  UPDATE = 'category.update',
  DELETE = 'category.delete'
}


export const useGetCategoryQuery = () => useReactQuery({
  queryKey: [CATEGORY_QUERY_KEY.GET],
  queryFn: () => getCategoryApi()
})

export const useAddCategoryMutation = () => useMutation({
  mutationKey: [CATEGORY_QUERY_KEY.ADD],
  mutationFn: (data: AddOrUpdateCategoryParam) => addCategoryApi(data)
})

export const useUpdateCategoryMutation = () => useMutation({
  mutationKey: [CATEGORY_QUERY_KEY.UPDATE],
  mutationFn: (data: AddOrUpdateCategoryParam) => updateCategoryApi(data)
})

export const useDeleteCategoryMutation = () => useMutation({
  mutationKey: [CATEGORY_QUERY_KEY.DELETE],
  mutationFn: (id: string) => deleteCategoryApi(id)
})
