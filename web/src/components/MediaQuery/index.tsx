/**
 * @author zhengji.su
 * @description MediaQuery
 */

import Hidden from "@mui/material/Hidden";
import type { Breakpoint } from "@mui/system";
import isArray from "lodash/isArray";
import type { ReactNode } from "react";

type MediaKey = 'pc' | 'pad' | 'mobile'
type Media = MediaKey | Array<MediaKey>

interface MediaQueryProps{
  children: ReactNode,
  media: Media
}

const mediaBreakpoints = {
  pc: ['lg', 'xl'],
  pad: ['md'],
  mobile: ['xs', 'sm']
}

const nextMedia = (media: Media) => {
  const mediaKeys = Object.keys(mediaBreakpoints) as Array<MediaKey>

  if (isArray(media)) {
    const medias = mediaKeys.flatMap(key => media.includes(key) ? [] : mediaBreakpoints[key])
    return medias as Breakpoint[]
  }

  return mediaKeys.flatMap(key => key === media ? [] : mediaBreakpoints[key]) as Breakpoint[]
}

function MediaQuery({ children, media }: MediaQueryProps) {
  const only = nextMedia(media)

  return (
    <Hidden only={only}>
      {children}
    </Hidden>
  )
}

export default MediaQuery
