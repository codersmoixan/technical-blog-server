import { useRef, useEffect, DependencyList, EffectCallback } from 'react';
import { deepEqual } from "@/src/utils";

type DepList = DependencyList | undefined

const useDeepCompareEffect = (callback: EffectCallback, deps: DepList) => {
  const ref = useRef<DepList>();
  const signalRef = useRef(0);

  if (!deepEqual<DepList>(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }

  useEffect(() => {
    const uninstall = callback()

    return () => uninstall?.();
  }, [signalRef.current]);
};

export default useDeepCompareEffect;
