/**
 * @author zhengji.su
 * @description Links
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Content from "components/Layout/Content";
import CreativeSky from "public/images/backdrop/cretive-sky.jpeg"
import Root from "components/Layout/Root";
import Banner from "components/Layout/Banner";

function Links() {

  return (
    <Root backdrop={CreativeSky}>
      <Content>
        <Banner>
          <Typography variant="h2" fontWeight={400}>
            世间的黑暗与痛苦
          </Typography>
          <Typography variant="h2" fontWeight={400}>
            依然有它的单纯和美好
          </Typography>
        </Banner>
      </Content>
    </Root>
  )
}

export default Links
