/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, DependencyList, EffectCallback } from 'react';
import useFirstMount from './useFirstMount';

const useUpdateEffect = (callback: EffectCallback, deps: DependencyList = []) => {
  const isFirstMount = useFirstMount();

  useEffect(() => {
    if (isFirstMount) {
      return;
    }

    const unMountCallback = callback();
    return () => unMountCallback?.();
  }, deps);
};

export default useUpdateEffect;
