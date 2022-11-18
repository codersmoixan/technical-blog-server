/**
 * @author zhengji.su
 * @description MediaVisible
 */

import React, { ReactNode } from 'react'
import Hidden from "@mui/material/Hidden";
import type { Breakpoint } from "@mui/system";
import isArray from "lodash/isArray";

type MediaKey = 'pc' | 'pad' | 'mobile'
type Media = MediaKey | Array<MediaKey>

interface MediaVisibleProps{
  children: ReactNode,
  media: Media
}

const mediaBreakpoints = {
  pc: ['lg', 'xl'],
  pad: ['sm', 'md'],
  mobile: ['xs']
}

const nextMedia = (media: Media) => {
  const mediaKeys = Object.keys(mediaBreakpoints) as Array<MediaKey>

  if (isArray(media)) {
    const medias = mediaKeys.flatMap(key => media.includes(key) ? [] : mediaBreakpoints[key])
    return medias as Breakpoint[]
  }

  return mediaKeys.flatMap(key => key === media ? [] : mediaBreakpoints[key]) as Breakpoint[]
}

function MediaVisible({ children, media }: MediaVisibleProps) {
  const only = nextMedia(media)

  return (
    <Hidden only={only}>
      {children}
    </Hidden>
  )
}

export default MediaVisible
