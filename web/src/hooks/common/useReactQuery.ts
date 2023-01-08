import {useQuery, QueryObserverOptions, UseQueryOptions, UseQueryResult} from "@tanstack/react-query";

export const querySetting: UseQueryOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: 3000
};

export interface UseQueryResultValue {
  code: number;
  data: any;
  msg: string;
}

const useReactQuery = ({ queryKey, queryFn, enabled }: UseQueryOptions): UseQueryResult<UseQueryResultValue> => useQuery({
  queryKey,
  queryFn,
  enabled,
  ...querySetting
}) as UseQueryResult<UseQueryResultValue>

export default useReactQuery
