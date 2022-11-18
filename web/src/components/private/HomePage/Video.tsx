/**
 * @author zhengji.su
 * @description Video
 */

import React from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import Hidden from "@mui/material/Hidden";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import MediaVisible from "components/common/MediaVisible";

const useStyles = makeStyles((theme: Theme) => ({
  backdropVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
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
      <MediaVisible media="pc">
        <video
          autoPlay
          loop
          playsInline
          muted
          className={classes.video}
        >
          <source src={require('public/video/backdrop-video.mp4')} type="video/mp4"/>
        </video>
      </MediaVisible>
      <MediaVisible media="pad">
        <video
          autoPlay
          loop
          playsInline
          muted
          className={classes.video}
        >
          <source src={require('public/video/pad-backdrop-video.mp4')} type="video/mp4"/>
        </video>
      </MediaVisible>
      <MediaVisible media="mobile" >
        <video
          autoPlay
          loop
          playsInline
          muted
          className={classes.video}
        >
          <source src={require('public/video/mobile-backdrop-video.mp4')} type="video/mp4"/>
        </video>
      </MediaVisible>
    </Box>
  )
}

export default Video
