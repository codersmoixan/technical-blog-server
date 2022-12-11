/**
 * @author zhengji.su
 * @description Video
 */

import React from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import MediaQuery from "components/MediaQuery";

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
