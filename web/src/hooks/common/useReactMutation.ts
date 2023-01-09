import { MutationFunction, useMutation } from "@tanstack/react-query";
import type { UseQueryResultValue } from "hooks/common/useReactQuery";
import type { UseMutationOptions } from "@tanstack/react-query";

export interface UseReactMutationValue extends UseQueryResultValue {}
export interface UseReactMutationOptions<D, T> extends Pick<UseMutationOptions, 'mutationKey'> {
  mutationFn: MutationFunction<D, T>
}

const useReactMutation = <T = unknown, D = UseReactMutationValue>({ mutationKey, mutationFn }: UseReactMutationOptions<D, T>)  => {
  return useMutation({
    mutationKey,
    mutationFn,
  })
}

export default useReactMutation
