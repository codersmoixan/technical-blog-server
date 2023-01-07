import { useGetCategoryQuery } from "hooks/queries/category";

const useCategory = () => {
  const { data: categories, isLoading: getLoading } = useGetCategoryQuery()

  return {
    categories,
    loading: getLoading
  }
}

export default useCategory
