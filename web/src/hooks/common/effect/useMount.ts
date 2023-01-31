/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, EffectCallback } from 'react';

const useMount = (callback: EffectCallback) => {
  useEffect(() => callback(), []);
};

export default useMount;
