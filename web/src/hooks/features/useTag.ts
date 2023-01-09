import {useAddTagMutation, useDeleteTagMutation, useGetTagListQuery, useUpdateTagMutation} from "hooks/queries/tag";

export type Tag = {
  id: string;
  value: string;
  label: string;
}

export interface UseTagReturns {
  tags: Tag[];
  loading: boolean;
  add: () => void;
  update: () => void;
  remove: () => void;
  refetchTags: () => void;
}

const useTag = (): UseTagReturns => {
  const { data: tags, isLoading, refetch: refetchTags } = useGetTagListQuery()
  const { mutateAsync: addTag, isLoading: addLoading } = useAddTagMutation()
  const { mutateAsync: updateTag, isLoading: updateLoading } = useUpdateTagMutation()
  const { mutateAsync: deleteTag, isLoading: deleteLoading } = useDeleteTagMutation()

  const add = () => {

  }

  const update = () => {

  }

  const remove = () => {

  }

  return {
    tags: tags?.data?.data ?? [],
    loading: isLoading || addLoading || updateLoading || deleteLoading,
    add,
    update,
    remove,
    refetchTags,
  }
}

export default useTag
