import { useEffect, EffectCallback } from 'react';

const useMount = (callback: EffectCallback) => {
  useEffect(() => callback(), []);
};

export default useMount;
