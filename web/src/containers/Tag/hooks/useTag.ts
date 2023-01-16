import { useAddTagMutation, useDeleteTagMutation, useGetTagListQuery, useUpdateTagMutation } from "containers/Tag/queries";
import useNotifier from "components/Snackbar/hooks/useNotifier";
import useSpeedDial from "containers/App/hooks/useSpeedDial";

export type Tag = {
  id: string;
  value: string;
  label: string;
}

export interface UseTagReturns {
  tags: Tag[];
  loading: boolean;
  add: (options: any) => void;
  update: (options: any) => void;
  remove: () => void;
  refetchTags: () => void;
}

const useTag = (): UseTagReturns => {
  const notify = useNotifier()
  const { clearSpeedDial } = useSpeedDial()
  const { data: tags, isLoading, refetch: refetchTags } = useGetTagListQuery()
  const { mutateAsync: addTag, isLoading: addLoading } = useAddTagMutation()
  const { mutateAsync: updateTag, isLoading: updateLoading } = useUpdateTagMutation()
  const { mutateAsync: deleteTag, isLoading: deleteLoading } = useDeleteTagMutation()

  const add = async (option: any) => {
    try {
      const result = await addTag(option)
      notify(result.msg)

      await refetchTags()
      clearSpeedDial()
    } catch (err) {
      console.log(err);
    }
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
