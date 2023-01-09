import { getSharingListApi, addSharingApi, updateSharingApi, deleteSharingApi } from "containers/Sharing/api";
import useReactQuery from "hooks/common/useReactQuery";
import useReactMutation from "hooks/common/useReactMutation";
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

export const useAddShareMutation = () => useReactMutation<AddSharingParam>({
  mutationKey: [SHARING_QUERY_KEY.ADD],
  mutationFn: (data) => addSharingApi(data)
})

export const useUpdateShareMutation = () => useReactMutation<any>({
  mutationKey: [SHARING_QUERY_KEY.UPDATE],
  mutationFn: (data: any) => updateSharingApi(data)
})

export const useDeleteShareMutation = (id: string) => useReactMutation<string>({
  mutationKey: [SHARING_QUERY_KEY.DELETE],
  mutationFn: (id) => deleteSharingApi(id)
})
