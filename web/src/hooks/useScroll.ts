import { useEffect, RefObject } from "react";

interface UseScrollProps {
  container: RefObject<any>
}

const useScroll = ({ container }: UseScrollProps) => {
  useEffect(() => {
    const scroll = (e) => {
      console.log(e, 6656)
    }

    container.current.addEventListener('scroll', scroll)

    return () => container.current.removeEventListener('scroll', scroll)
  }, [container])

  return null
}

export default useScroll
