import { useMemo, useRef, useState, useEffect } from "react";
import get from "lodash/get";
import throttle from "lodash/throttle";
import useMount from "hooks/effect/useMount";
import type { EmptyObject } from "@/src/tb.types";

interface UseSidesSwiperProps {
  sideSize: number;
  sideLength: number;
}

const useSidesSwiper = ({ sideLength, sideSize }: UseSidesSwiperProps) => {
  const [swiper, setSwiper] = useState<EmptyObject>({})
  const [container, setContainer] = useState<EmptyObject>({})
  const [step, setStep] = useState(0)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [start, setStart] = useState(0)

  const swiperRef = useRef(null)
  const containerRef = useRef(null)

  const { swiperWidth, containerWidth } = useMemo(() => {
    return ({
      swiperWidth: swiper.width ?? 0,
      containerWidth: container.width ?? 0
    })
  }, [swiper, container])

  useMount(() => windowResize())

  useEffect(() => {
    window.addEventListener('resize', throttle(windowResize, 500))

    return () => window.removeEventListener('resize', windowResize)
  }, [])

  function windowResize() {
    setSwiper(() => (swiperRef.current as any)?.getBoundingClientRect())
    setContainer(() => (containerRef.current as any)?.getBoundingClientRect())
  }

  const scroll = (space: number) => {
    const swiperTarget = swiperRef.current as any

    if (!swiperTarget) return

    swiperTarget.style.transform = `translateX(${space}px)`
  }

  const onPrev = () => {
    let count = step
    count --
    const space = count * sideSize

    setStep(count)
    setNextDisabled(false)
    setPrevDisabled(count <= 0)

    scroll(-space)
  }

  const onNext = () => {
    let count = step
    count ++
    const space = count * sideSize

    const maxOffsetX = (sideLength * sideSize - (space + containerWidth)) < 0
    setNextDisabled(maxOffsetX)
    setPrevDisabled(false)
    setStep(count)

    scroll(-space)
  }

  return {
    swiper,
    swiperRef,
    container,
    containerRef,
    prevDisabled,
    nextDisabled,
    onPrev,
    onNext,
  }
}

export default useSidesSwiper
