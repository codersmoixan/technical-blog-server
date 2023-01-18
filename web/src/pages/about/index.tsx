/**
 * @author zhengji.su
 * @description About
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Root from "components/Layout/Root";
import Content from "components/Layout/Content";
import CreativeLines from "assets/images/backdrop/creative-lines.jpeg"

function About() {

  return (
    <Root backdrop={CreativeLines}>
      <Content>
        <Typography variant="h2">About</Typography>
      </Content>
    </Root>
  )
}

export default About
