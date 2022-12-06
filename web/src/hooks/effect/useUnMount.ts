import { useEffect } from 'react';

const useUnMount = (callback: () => void) => {
  useEffect(() => () => callback(), []);
};

export default useUnMount;
