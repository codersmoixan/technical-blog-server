import {useMutation, useQuery} from "@tanstack/react-query";
import { getCategoriesApi, getShareListApi, addShareApi, updateShareApi, deleteShareApi } from "containers/Sharing/api";
import {PageParams} from "@/src/tb.types";

export const useGetCategoriesQuery = () => useQuery({
  queryKey: ['sharing.getCategories'],
  queryFn: () => getCategoriesApi(),
})

export const useGetShareListQuery = ({ page, pageSize }: PageParams) => useQuery({
  queryKey: ['sharing.getShareList', page, pageSize],
  queryFn: () => getShareListApi({ page, pageSize }),
  enabled: !!page && !!pageSize
})

export const useAddShareMutation = (data: any) => useMutation({
  mutationKey: ['sharing.addShare'],
  mutationFn: () => addShareApi(data)
})

export const useUpdateShareMutation = (data: any) => useMutation({
  mutationKey: ['sharing.updateShare'],
  mutationFn: () => updateShareApi(data)
})

export const useDeleteShareMutation = (id: string) => useMutation({
  mutationKey: ['sharing.deleteShare'],
  mutationFn: () => deleteShareApi(id)
})
