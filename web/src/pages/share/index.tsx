/**
 * @author zhengji.su
 * @description Share
 */

import React, { useRef } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Content from "components/common/Layout/Content";
import Root from "components/common/Layout/Root";
import CreativeGrid from "public/images/backdrop/creative-grid.jpeg"
import { makeStyles } from "@mui/styles";
import Banner from "components/common/Layout/Banner";
import Menu from "components/common/Menu";
import { useTheme } from "@mui/material/styles";
import SearchFormText from "components/common/Form/SearchFormText";
import ArrowBack from "@mui/icons-material/ArrowBack"
import type { Theme } from "@mui/material";

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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3)
    }
  },
  banner: {
    alignItems: 'flex-start'
  },
  content: {
    display: 'flex',
    marginTop: theme.spacing(8)
  },
  menuContainer: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(-3)
  },
  menu: {
    width: 255
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
  },
  back: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 185,
    height: 45,
    backgroundColor: theme.palette.primary.main,
    color: theme.status.white,
    borderRadius: '2px 2px 0 0',
    '& > svg': {
      marginRight: theme.spacing(1),
      fontSize: 16
    }
  }
}))

function Share() {
  const classes = useStyles()
  const theme = useTheme()

  const pointRef = useRef<HTMLElement | null>(null)

  return (
    <Root backdrop={CreativeGrid}>
      <Content className={classes.root}>
        <Banner className={classes.banner}>
          <Typography variant="h2" fontWeight={400}>
            总结和分享
          </Typography>
          <Typography variant="h2" fontWeight={400}>
            会有意想不到的收获
          </Typography>
          <Box className={classes.back} ref={pointRef}>
            <ArrowBack />
            <Typography component="a" variant="body1" color="white">
              返回首页
            </Typography>
          </Box>
        </Banner>
        <Box className={classes.content}>
          <Box className={classes.menuContainer}>
            <Typography
              variant="h3"
              fontWeight={400}
              className={classes.menuTitle}
            >
              分类
            </Typography>
            <Menu menus={options} isBorder className={classes.menu} />
          </Box>
          <Box className={classes.main}>
            <Box className={classes.search}>
              <SearchFormText
                className={classes.formText}
                bgColor={theme.status.transparent}
                placeholder="这里可以搜索你想知道的内容"
                anchorPoint={pointRef}
              />
            </Box>
          </Box>
        </Box>
      </Content>
    </Root>
  )
}

export default Share
