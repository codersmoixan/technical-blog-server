import { useQuery } from "@tanstack/react-query";
import { request } from "service/index"

export const getCategoriesApi = () => request('GET', 'categories/list')

export const useGetCategoriesQuery = () => useQuery({
  queryKey: ['share.getCategories'],
  queryFn: () => getCategoriesApi(),
  networkMode: 'online'
})
