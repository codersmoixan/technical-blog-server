import { useGetShareListQuery } from "containers/Sharing/queries";
import {PageParams} from "@/src/tb.types";

export interface UseSharingProps extends PageParams {}

const useSharing = (props?: UseSharingProps) => {
  const { page = 1, pageSize = 10 } = props ?? {}

  const { data: blogs, isLoading } = useGetShareListQuery({
    page,
    pageSize
  })

  return {
    blogs,
    loading: isLoading
  }
}

export default useSharing
