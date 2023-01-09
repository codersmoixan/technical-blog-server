import { MutationFunction, useMutation as useReactMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { UseQueryOrMutationResultValue } from "hooks/common/query/type";

export interface UseReactMutationOptions<D, T> extends Pick<UseMutationOptions, 'mutationKey'> {
  mutationFn: MutationFunction<D, T>
}

const useMutation = <T = unknown, D = UseQueryOrMutationResultValue>({ mutationKey, mutationFn }: UseReactMutationOptions<D, T>)  => {
  return useReactMutation({
    mutationKey,
    mutationFn,
  })
}

export default useMutation
