/**
 * @author zhengji.su
 * @description Video
 */

import React, {useEffect, useRef} from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import MediaQuery from "components/MediaQuery";

const useStyles = makeStyles((theme: Theme) => ({
  backdropVideo: {
    position: 'relative',
    width: '100%',
    zIndex: -1
  },
  video: {
    width: '100%',
  }
}))

function Video(props: BoxProps) {
  const classes = useStyles(props)

  return (
    <Box className={classes.backdropVideo} {...props}>
      <MediaQuery media="pc">
        <video
          autoPlay
          loop
          playsInline
          muted
          className={classes.video}
        >
          <source src={require('public/video/backdrop-video.mp4')} type="video/mp4"/>
        </video>
      </MediaQuery>
      <MediaQuery media="pad">
        <video
          autoPlay
          loop
          playsInline
          muted
          className={classes.video}
        >
          <source src={require('public/video/pad-backdrop-video.mp4')} type="video/mp4"/>
        </video>
      </MediaQuery>
      <MediaQuery media="mobile" >
        <video
          autoPlay
          loop
          playsInline
          muted
          className={classes.video}
        >
          <source src={require('public/video/mobile-backdrop-video.mp4')} type="video/mp4"/>
        </video>
      </MediaQuery>
    </Box>
  )
}

export default Video
