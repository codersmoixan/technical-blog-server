import useReactQuery from "hooks/common/useReactQuery";
import { addTagApi, deleteTagApi, getTagListApi, updateTagApi } from "api/tag";
import { useMutation } from "@tanstack/react-query";

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

export const useAddTagMutation = () => useMutation({
  mutationKey: [TAG_QUERY_KEY.ADD],
  mutationFn: (data: any) => addTagApi(data)
})

export const useUpdateTagMutation = () => useMutation({
  mutationKey: [TAG_QUERY_KEY.UPDATE],
  mutationFn: (data: any) => updateTagApi(data)
})

export const useDeleteTagMutation = () => useMutation({
  mutationKey: [TAG_QUERY_KEY.DELETE],
  mutationFn: (data: any) => deleteTagApi(data)
})
