import {useMutation, useQuery} from "@tanstack/react-query";
import { getCategoriesApi, getShareListApi, addShareApi, updateShareApi, deleteShareApi } from "containers/Share/api";

export const useGetCategoriesQuery = () => useQuery({
  queryKey: ['share.getCategories'],
  queryFn: () => getCategoriesApi(),
})

export const useGetShareListQuery = () => useQuery({
  queryKey: ['share.getShareList'],
  queryFn: () => getShareListApi(),
})

export const useAddShareMutation = (data: any) => useMutation({
  mutationKey: ['share.addShare'],
  mutationFn: () => addShareApi(data)
})

export const useUpdateShareMutation = (data: any) => useMutation({
  mutationKey: ['share.updateShare'],
  mutationFn: () => updateShareApi(data)
})

export const useDeleteShareMutation = (id: string) => useMutation({
  mutationKey: ['share.deleteShare'],
  mutationFn: () => deleteShareApi(id)
})
