import { useMemo, useRef, useState, TouchEventHandler } from "react";
import useMount from "hooks/effect/useMount";
import type { EmptyObject } from "@/src/tb.types";
import get from "lodash/get";
import throttle from "lodash/throttle";

interface UseSidesSwiperProps {
  length: number
}

const useSidesSwiper = ({ length }: UseSidesSwiperProps) => {
  const [swiper, setSwiper] = useState<EmptyObject>({})
  const [side, setSide] = useState<EmptyObject>({})
  const [step, setStep] = useState(1)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [start, setStart] = useState(0)
  const [offset, setOffset] = useState(0)

  const swiperRef = useRef(null)
  const sideRef = useRef(null)

  const { swiperWidth, sideWidth } = useMemo(() => {
    return ({
      sideWidth: side.width ? side.width + 24 : 0,
      swiperWidth: swiper.width ?? 0
    })
  }, [swiper, side])

  useMount(() => {
    setSwiper(() => (swiperRef.current as any)?.getBoundingClientRect())
    setSide(() => (sideRef.current as any)?.getBoundingClientRect())
  })

  const scroll = (space: number) => {
    const swiperTarget = swiperRef.current as any

    if (!swiperTarget || space < 0) return

    swiperTarget.scrollTo({
      left: space,
      behavior: 'smooth'
    })
  }

  const onPrev = () => {
    const space = step * sideWidth

    if (space < 0) return

    scroll(space)
    setOffset(space)

    setStep(() => space <= 0 ? 1 : step - 1)
    setNextDisabled(false)
    setPrevDisabled(space <= 0)
  }

  const onNext = () => {
    const space = step * sideWidth

    if (space + swiperWidth >= length * sideWidth) return

    scroll(space)
    setOffset(space)

    const maxOffsetX = space + swiperWidth >= (length - 1) * sideWidth
    setStep(() => maxOffsetX ? 1 : step + 1)
    setPrevDisabled(false)
    setNextDisabled(maxOffsetX)
  }

  const onTouchStart = (event: any) => {
    const clientX = get(event, 'changedTouches[0].clientX', 0)
    setStart(clientX)
  }

  const onTouchMove = (event: any) => {
    const clientX = get(event, 'changedTouches[0].clientX', 0)
    if (start - clientX) {}
    console.log(start - clientX);
    // scroll(offset + (start - clientX))
  }

  const onTouchEnd = (event: any) => {
    const clientX = get(event, 'changedTouches[0].clientX', 0)
    if (clientX < start) {
      onNext()
    } else {
      onPrev()
    }
  }

  return {
    side,
    swiper,
    sideRef,
    swiperRef,
    prevDisabled,
    nextDisabled,
    onPrev,
    onNext,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

export default useSidesSwiper
