import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "hooks/queries/category";
import useNotifier from "components/Snackbar/hooks/useNotifier";
import type { AddOrUpdateCategoryParam } from "api/category";

export interface UseCategoryReturns {
  categories: any[];
  loading: boolean;
  add: (data: AddOrUpdateCategoryParam) => void;
  update: (data: AddOrUpdateCategoryParam) => void;
  remove: (id: string) => void;
  refetchCategory: () => void
}

const useCategory = (): UseCategoryReturns => {
  const { data: categories, refetch: refetchCategory, isLoading: getLoading } = useGetCategoryQuery()
  const { mutateAsync: addCategory, isLoading: addLoading } = useAddCategoryMutation()
  const { mutateAsync: updateCategory, isLoading: updateLoading } = useUpdateCategoryMutation()
  const { mutateAsync: deleteCategory, isLoading: deleteLoading } = useDeleteCategoryMutation()
  const notify = useNotifier()

  const add = async (data: AddOrUpdateCategoryParam) => {
    const result = await addCategory(data)
    notify(result.msg)

    await refetchCategory()
  }

  const update = async (data: AddOrUpdateCategoryParam) => {
    const result = await updateCategory(data)
    notify(result.msg)

    await refetchCategory()
  }

  const remove = async (id: string) => {
    const result = await deleteCategory(id)
    notify(result.msg)
  }

  return {
    categories: categories?.data?.data ?? [],
    loading: getLoading || addLoading || updateLoading || deleteLoading,
    add,
    update,
    remove,
    refetchCategory
  }
}

export default useCategory
