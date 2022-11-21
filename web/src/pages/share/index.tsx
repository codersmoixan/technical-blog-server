/**
 * @author zhengji.su
 * @description Share
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Content from "components/common/Layout/Content";
import Root from "components/common/Layout/Root";
import CreativeGrid from "public/images/backdrop/creative-grid.jpeg"

function Share() {

  return (
    <Root backdrop={CreativeGrid}>
      <Content>
        <Typography variant="h2">Share</Typography>
      </Content>
    </Root>
  )
}

export default Share
