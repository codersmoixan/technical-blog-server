import useReactQuery from "hooks/common/useReactQuery";
import { addTagApi, deleteTagApi, getTagListApi, updateTagApi } from "api/tag";
import useReactMutation from "hooks/common/useReactMutation";

export enum TAG_QUERY_KEY {
  GET = 'tag.get',
  ADD = 'tag.add',
  UPDATE = 'tag.update',
  DELETE = 'tag.delete'
}

export const useGetTagListQuery = () => useReactQuery({
  queryKey: [TAG_QUERY_KEY.GET],
  queryFn: () => getTagListApi()
})

export const useAddTagMutation = () => useReactMutation<any>({
  mutationKey: [TAG_QUERY_KEY.ADD],
  mutationFn: (data) => addTagApi(data)
})

export const useUpdateTagMutation = () => useReactMutation<any>({
  mutationKey: [TAG_QUERY_KEY.UPDATE],
  mutationFn: (data) => updateTagApi(data)
})

export const useDeleteTagMutation = () => useReactMutation<any>({
  mutationKey: [TAG_QUERY_KEY.DELETE],
  mutationFn: (data) => deleteTagApi(data)
})
