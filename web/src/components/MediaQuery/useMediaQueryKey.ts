import isArray from "lodash/isArray";
import type { Breakpoint } from "@mui/system";

export type MediaKey = 'pc' | 'pad' | 'mobile'
export type Media = MediaKey | Array<MediaKey>

const mediaBreakpoints = {
  pc: ['lg', 'xl'],
  pad: ['md'],
  mobile: ['xs', 'sm']
}

const useMediaQueryKey = (media: Media) => {
  const mediaKeys = Object.keys(mediaBreakpoints) as Array<MediaKey>

  if (isArray(media)) {
    const medias = mediaKeys.flatMap(key => media.includes(key) ? [] : mediaBreakpoints[key])
    return medias as Breakpoint[]
  }

  return mediaKeys.flatMap(key => key === media ? [] : mediaBreakpoints[key]) as Breakpoint[]
}

export default useMediaQueryKey
