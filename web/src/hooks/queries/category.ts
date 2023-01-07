import useReactQuery from "hooks/common/useReactQuery";
import { addCategoryApi, deleteCategoryApi, getCategoryApi, updateCategoryApi } from "api/category";
import { useMutation } from "@tanstack/react-query";

export enum CATEGORY_QUERY_KEY {
  GET = 'category.get',
  ADD = 'category.add',
  UPDATE = 'category.update',
  DELETE = 'category.delete'
}

export const useGetCategoryQuery = () => useReactQuery({
  queryKey: [CATEGORY_QUERY_KEY.GET],
  queryFn: () => getCategoryApi(),
})

export const useAddCategoryMutation = () => useMutation({
  mutationKey: [CATEGORY_QUERY_KEY.ADD],
  mutationFn: (data: any) => addCategoryApi(data)
})

export const useUpdateCategoryMutation = () => useMutation({
  mutationKey: [CATEGORY_QUERY_KEY.UPDATE],
  mutationFn: (data: any) => updateCategoryApi(data)
})

export const useDeleteCategoryMutation = () => useMutation({
  mutationKey: [CATEGORY_QUERY_KEY.DELETE],
  mutationFn: (data: any) => deleteCategoryApi(data)
})
