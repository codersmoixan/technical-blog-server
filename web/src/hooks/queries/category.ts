import useReactQuery from "hooks/common/useReactQuery";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoryApi,
  updateCategoryApi,
  AddOrUpdateCategoryParam
} from "api/category";
import useReactMutation from "hooks/common/useReactMutation";

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

export const useAddCategoryMutation = () => useReactMutation<AddOrUpdateCategoryParam>({
  mutationKey: [CATEGORY_QUERY_KEY.ADD],
  mutationFn: (data) => addCategoryApi(data)
})

export const useUpdateCategoryMutation = () => useReactMutation<AddOrUpdateCategoryParam>({
  mutationKey: [CATEGORY_QUERY_KEY.UPDATE],
  mutationFn: (data) => updateCategoryApi(data)
})

export const useDeleteCategoryMutation = () => useReactMutation<string>({
  mutationKey: [CATEGORY_QUERY_KEY.DELETE],
  mutationFn: (id) => deleteCategoryApi(id)
})
