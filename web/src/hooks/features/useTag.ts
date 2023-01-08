import {useAddTagMutation, useDeleteTagMutation, useGetTagListQuery, useUpdateTagMutation} from "hooks/queries/tag";

const useTag = () => {
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
