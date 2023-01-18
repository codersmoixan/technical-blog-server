/**
 * @author zhengji.su
 * @description Files
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Content from "components/Layout/Content";
import Root from "components/Layout/Root";
import CreativeVeins from "assets/images/backdrop/creative-veins.jpeg"

function Files() {

  return (
    <Root backdrop={CreativeVeins}>
      <Content>
        <Typography variant="h2">Files</Typography>
      </Content>
    </Root>
  )
}

export default Files
