/**
 * @author zhengji.su
 * @description Tags
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Content from "components/Layout/Content";
import Root from "components/Layout/Root";
import CreativeBleak from "public/images/backdrop/creative-bleak.jpeg"
import {makeStyles} from "@mui/styles";
import type {Theme} from "@mui/material";
import Banner from "components/Layout/Banner";

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    display: 'flex',
    alignItems: 'center',
    height: theme.status.backdropHeight,
  }
}))

function Tags() {
  const classes = useStyles()

  return (
    <Root backdrop={CreativeBleak} m="0px auto">
      <Content pt={0}>
        <Banner>
          <Box>
            <Typography variant="h2" fontWeight={400}>
              你一路颠沛流离
            </Typography>
            <Typography variant="h2" fontWeight={400}>
              到最遥远的地方旅行
            </Typography>
          </Box>
        </Banner>
      </Content>
    </Root>
  )
}

export default Tags
