import { getSharingListApi, addSharingApi, updateSharingApi, deleteSharingApi } from "containers/Sharing/api";
import useQuery from "hooks/common/query/useQuery";
import useMutation from "hooks/common/query/useMutation";
import type { PageParams } from "@/src/tb.types";
import type { AddSharingParam } from "containers/Sharing/types";

export enum SHARING_QUERY_KEY {
  GET = 'sharing.get',
  ADD = 'sharing.add',
  UPDATE = 'sharing.update',
  DELETE = 'sharing.delete'
}

export const useGetShareListQuery = ({ page, pageSize }: PageParams) => useQuery({
  queryKey: [SHARING_QUERY_KEY.GET, page, pageSize],
  queryFn: () => getSharingListApi({ page, pageSize }),
  enabled: !!page && !!pageSize
})

export const useAddShareMutation = () => useMutation<AddSharingParam>({
  mutationKey: [SHARING_QUERY_KEY.ADD],
  mutationFn: (data) => addSharingApi(data)
})

export const useUpdateShareMutation = () => useMutation<any>({
  mutationKey: [SHARING_QUERY_KEY.UPDATE],
  mutationFn: (data: any) => updateSharingApi(data)
})

export const useDeleteShareMutation = (id: string) => useMutation<string>({
  mutationKey: [SHARING_QUERY_KEY.DELETE],
  mutationFn: (id) => deleteSharingApi(id)
})
