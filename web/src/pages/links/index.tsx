/**
 * @author zhengji.su
 * @description Links
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Content from "components/common/Layout/Content";
import CreativeSky from "public/images/backdrop/cretive-sky.jpeg"
import Root from "components/common/Layout/Root";

function Links() {

  return (
    <Root backdrop={CreativeSky}>
      <Content>
        <Typography variant="h2">Links</Typography>
      </Content>
    </Root>
  )
}

export default Links
