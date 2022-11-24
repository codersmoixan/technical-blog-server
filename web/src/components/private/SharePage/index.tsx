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
import MediaVisible from "components/common/MediaVisible";
import Search from "@mui/icons-material/Search"
import Catalog from "components/private/SharePage/components/Catalog";

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
  },
  {
    id: 4,
    label: '人工智能',
    child: [
      {
        id: 1,
        label: '机器学习'
      },
      {
        id: 2,
        label: '算法导论'
      }
    ]
  },
  {
    id: 5,
    label: '大数据',
    child: [
      {
        id: 1,
        label: '大数据理论'
      },
      {
        id: 2,
        label: '算法导论'
      }
    ]
  }
]

const useStyles = makeStyles((theme: Theme) => ({
  banner: {
    alignItems: 'flex-start'
  },
  content: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginTop: theme.spacing(8),
    }
  },
  main: {
    flex: 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(8),
    }
  },
  search: {
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(3)
    }
  },
  formText: {
    width: '100%',
    boxShadow: 'rgb(19 19 19 / 12%) 0px 2px 5px 0.5px',
    '& .MuiInputBase-root': {
      backgroundColor: theme.status.white,
    },
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
  const searchRef = useRef<HTMLElement | null>(null)

  const handleSearchFocus = () => {
    searchRef.current?.focus()
  }

  return (
    <Root backdrop={CreativeGrid}>
      <Content>
        <Banner className={classes.banner}>
          <Typography variant="h2" fontWeight={400}>
            总结和分享
          </Typography>
          <Typography variant="h2" fontWeight={400}>
            会有意想不到的收获
          </Typography>
          <MediaVisible media={['pad', 'pc']}>
            <Box className={classes.back} ref={pointRef}>
              <ArrowBack />
              <Typography component="a" variant="body1" color="white">
                返回首页
              </Typography>
            </Box>
          </MediaVisible>
        </Banner>
        <Box className={classes.content}>
          <Catalog menus={options} onSearchFocus={handleSearchFocus} ref={pointRef} />
          <Box className={classes.main}>
            <Box className={classes.search}>
              <SearchFormText
                className={classes.formText}
                bgColor={theme.status.transparent}
                placeholder="这里可以搜索你想知道的内容"
                anchorPoint={pointRef}
                inputProps={{
                  ref: searchRef
                }}
              />
            </Box>
          </Box>
        </Box>
      </Content>
    </Root>
  )
}

export default Share
