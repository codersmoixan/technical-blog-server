import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "containers/Category/queries";
import useNotifier from "components/Snackbar/hooks/useNotifier";
import useSpeedDial from "containers/App/hooks/useSpeedDial";

export interface UseCategoryReturns {
  categories: any[];
  loading: boolean;
  add: (data: any) => void;
  update: (data: any) => void;
  remove: (id: string) => void;
  refetchCategory: () => void
}

const useCategory = (): UseCategoryReturns => {
  const notify = useNotifier()
  const { clearSpeedDial } = useSpeedDial()
  const { data: categories, refetch: refetchCategory, isLoading: getLoading } = useGetCategoryQuery()
  const { mutateAsync: addCategory, isLoading: addLoading } = useAddCategoryMutation()
  const { mutateAsync: updateCategory, isLoading: updateLoading } = useUpdateCategoryMutation()
  const { mutateAsync: deleteCategory, isLoading: deleteLoading } = useDeleteCategoryMutation()

  const add = async (data: any) => {
    const result = await addCategory(data)
    notify(result.msg)

    await refetchCategory()
    clearSpeedDial()
  }

  const update = async (data: any) => {
    const result = await updateCategory(data)
    notify(result.msg)

    await refetchCategory()
    clearSpeedDial()
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
