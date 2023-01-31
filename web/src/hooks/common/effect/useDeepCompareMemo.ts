/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useRef, DependencyList } from 'react';
import { deepEqual } from "@/src/utils";

type DepList = DependencyList | undefined

const useDeepCompareMemo = <T>(callback: () => T, deps: DepList) => {
  const ref = useRef<DepList>([]);
  const signalRef = useRef(0);

  if (!deepEqual<DepList>(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  return useMemo<T>(() => callback(), [signalRef.current]);
};

export default useDeepCompareMemo;
