import { useQuery as useReactQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { UseQueryOrMutationResultValue } from "hooks/common/query/type";

export const querySetting: UseQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: 3000
};

const useQuery = ({ queryKey, queryFn, enabled }: UseQueryOptions): UseQueryResult<UseQueryOrMutationResultValue> => useReactQuery({
  queryKey,
  queryFn,
  enabled,
  ...querySetting
}) as UseQueryResult<UseQueryOrMutationResultValue>

export default useQuery
