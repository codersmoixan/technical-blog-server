/**
 * @author zhengji.su
 * @description Tags
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Content from "components/common/Layout/Content";
import Root from "components/common/Layout/Root";
import CreativeBleak from "public/images/backdrop/creative-bleak.jpeg"

function Tags() {

  return (
    <Root backdrop={CreativeBleak}>
      <Content>
        <Typography variant="h2">Tags</Typography>
      </Content>
    </Root>
  )
}

export default Tags
