import { useQuery, QueryObserverOptions } from "@tanstack/react-query";

export const querySetting: QueryObserverOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: 3000
};

const useReactQuery = ({ queryKey, queryFn, enabled }: QueryObserverOptions) => useQuery({
  queryKey,
  queryFn,
  enabled,
  ...querySetting
})

export default useReactQuery
