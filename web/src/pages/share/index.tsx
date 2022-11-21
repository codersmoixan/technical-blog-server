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
import { makeStyles } from "@mui/styles";
import Banner from "components/common/Layout/Banner";
import type { Theme } from "@mui/material";
import Menu from "components/common/Menu";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex'
  }
}))

const options = [
  {
    id: 1,
    label: '前端',
    child: [
      {
        id: 1,
        label: 'react'
      },
      {
        id: 2,
        label: 'vue'
      }
    ]
  },
  {
    id: 2,
    label: '后端',
    child: [
      {
        id: 1,
        label: 'java'
      },
      {
        id: 2,
        label: 'go'
      }
    ]
  },
  {
    id: 3,
    label: '运维',
    child: [
      {
        id: 1,
        label: 'k8s'
      },
      {
        id: 2,
        label: 'docker'
      }
    ]
  }
]

function Share() {
  const classes = useStyles()

  return (
    <Root backdrop={CreativeGrid}>
      <Content>
        <Banner>
          <Typography variant="h2" fontWeight={400}>
            总结和分享
          </Typography>
          <Typography variant="h2" fontWeight={400}>
            总会有意想不到的收获
          </Typography>
        </Banner>
        <Box className={classes.content}>
          <Menu menus={options} />
        </Box>
      </Content>
    </Root>
  )
}

export default Share
