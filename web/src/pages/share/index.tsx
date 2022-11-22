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
import FormText from "components/common/Form/FormText";
import {useTheme} from "@mui/material/styles";

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  banner: {
    alignItems: 'flex-start'
  },
  content: {
    display: 'flex',
    marginTop: theme.spacing(8)
  },
  menu: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(-3)
  },
  menuTitle: {
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.status.colorSecondary}`
  },
  main: {
    marginLeft: theme.spacing(8),
    flex: 1
  },
  search: {
  },
  formText: {
    width: '100%',
    boxShadow: 'rgb(19 19 19 / 12%) 0px 2px 5px 0.5px',
    '& input.MuiInputBase-input': {
      height: 58
    }
  }
}))

function Share() {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Root backdrop={CreativeGrid} className={classes.root}>
      <Content>
        <Banner className={classes.banner}>
          <Typography variant="h2" fontWeight={400}>
            总结和分享
          </Typography>
          <Typography variant="h2" fontWeight={400}>
            会有意想不到的收获
          </Typography>
        </Banner>
        <Box className={classes.content}>
          <Box className={classes.menu}>
            <Typography
              variant="h3"
              fontWeight={400}
              className={classes.menuTitle}
            >分类</Typography>
            <Menu menus={options} />
          </Box>
          <Box className={classes.main}>
            <Box className={classes.search}>
              <FormText className={classes.formText} bgColor={theme.status.transparent} label="这里可以搜索你想知道的内容" />
            </Box>
          </Box>
        </Box>
      </Content>
    </Root>
  )
}

export default Share
