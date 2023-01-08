import { useMutation } from "@tanstack/react-query";
import { getSharingListApi, addSharingApi, updateSharingApi, deleteSharingApi } from "containers/Sharing/api";
import useReactQuery from "hooks/common/useReactQuery";
import type { PageParams } from "@/src/tb.types";
import type { AddSharingParam } from "containers/Sharing/type";

export enum SHARING_QUERY_KEY {
  GET = 'sharing.get',
  ADD = 'sharing.add',
  UPDATE = 'sharing.update',
  DELETE = 'sharing.delete'
}

export const useGetShareListQuery = ({ page, pageSize }: PageParams) => useReactQuery({
  queryKey: [SHARING_QUERY_KEY.GET, page, pageSize],
  queryFn: () => getSharingListApi({ page, pageSize }),
  enabled: !!page && !!pageSize
})

export const useAddShareMutation = () => useMutation({
  mutationKey: [SHARING_QUERY_KEY.ADD],
  mutationFn: (data: AddSharingParam) => addSharingApi(data)
})

export const useUpdateShareMutation = (data: any) => useMutation({
  mutationKey: [SHARING_QUERY_KEY.UPDATE],
  mutationFn: () => updateSharingApi(data)
})

export const useDeleteShareMutation = (id: string) => useMutation({
  mutationKey: [SHARING_QUERY_KEY.DELETE],
  mutationFn: () => deleteSharingApi(id)
})
