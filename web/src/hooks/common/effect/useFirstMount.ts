import { useRef } from 'react';

const useFirstMount = () => {
  const isFirstMount = useRef(true);

  if (isFirstMount.current) {
    isFirstMount.current = false;

    return true;
  }

  return isFirstMount.current;
};

export default useFirstMount;
