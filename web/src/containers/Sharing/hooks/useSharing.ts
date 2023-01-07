import { useAddShareMutation, useGetShareListQuery } from "containers/Sharing/queries";
import useNotifier from "components/Snackbar/hooks/useNotifier";
import type { AddSharingParam } from "containers/Sharing/type";
import type { PageParams } from "@/src/tb.types";

export interface UseSharingProps extends PageParams {}

const useSharing = (props?: UseSharingProps) => {
  const { page = 1, pageSize = 10 } = props ?? {}

  const notify = useNotifier()
  const { data: blogs, isLoading } = useGetShareListQuery({
    page,
    pageSize
  })
  const { mutateAsync: add, isLoading: addLoading } = useAddShareMutation()

  const addSharing = async (data: AddSharingParam) => {
    try {
      await add(data)
      notify('文章添加成功!')
    } catch (err) {
      console.log(err);
      notify('文章添加失败!', 'warning')
    }
  }

  return {
    blogs,
    loading: isLoading || addLoading,
    addSharing
  }
}

export default useSharing
