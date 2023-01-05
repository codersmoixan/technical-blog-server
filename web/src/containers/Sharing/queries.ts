import {useMutation, useQuery} from "@tanstack/react-query";
import { getCategoryApi, getSharingListApi, addSharingApi, updateSharingApi, deleteSharingApi } from "containers/Sharing/api";
import type { PageParams } from "@/src/tb.types";
import type { AddSharingParam } from "containers/Sharing/type";

export const useGetCategoryQuery = () => useQuery({
  queryKey: ['sharing.getCategory'],
  queryFn: () => getCategoryApi(),
})

export const useGetShareListQuery = ({ page, pageSize }: PageParams) => useQuery({
  queryKey: ['sharing.getShareList', page, pageSize],
  queryFn: () => getSharingListApi({ page, pageSize }),
  enabled: !!page && !!pageSize
})

export const useAddShareMutation = () => useMutation({
  mutationKey: ['sharing.addShare'],
  mutationFn: (data: AddSharingParam) => addSharingApi(data)
})

export const useUpdateShareMutation = (data: any) => useMutation({
  mutationKey: ['sharing.updateShare'],
  mutationFn: () => updateSharingApi(data)
})

export const useDeleteShareMutation = (id: string) => useMutation({
  mutationKey: ['sharing.deleteShare'],
  mutationFn: () => deleteSharingApi(id)
})
