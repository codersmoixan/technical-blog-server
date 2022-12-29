import { useGetShareListQuery } from "containers/Share/queries";
import {PageParams} from "@/src/tb.types";

export interface UseShareProps extends PageParams {}

const useShare = (props?: UseShareProps) => {
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

export default useShare
