/**
 * @author zhengji.su
 * @description Share
 */

import React, { useRef } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreativeGrid from "public/images/backdrop/creative-grid.jpeg"
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import ArrowBack from "@mui/icons-material/ArrowBack"
import Grid from "@mui/material/Grid"
import MediaQuery from "components/common/MediaQuery";
import Catalog from "components/private/SharePage/components/Catalog";
import BlogCard, { DESCRIPTION, EXPANDED } from "components/private/SharePage/components/BlogCard";
import Content from "components/common/Layout/Content";
import Root from "components/common/Layout/Root";
import SearchFormText from "components/common/Form/SearchFormText";
import Banner from "components/common/Layout/Banner";
import { options, blogList } from "./constants"
import type { Theme } from "@mui/material";

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
  },
  gridItem: {
    transition: 'all .3s'
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
          <MediaQuery media={['pad', 'pc']}>
            <Box className={classes.back} ref={pointRef}>
              <ArrowBack />
              <Typography component="a" variant="body1" color="white">
                返回首页
              </Typography>
            </Box>
          </MediaQuery>
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
            <Grid container spacing={3} py={3}>
              {blogList.map(blog => (

                <Grid
                  key={blog.id}
                  item
                  spacing={2}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  display="flex"
                  justifyContent="center"
                  className={classes.gridItem}
                >
                  <BlogCard title={blog.title} date="2022.11.06" >
                    <Box slot={DESCRIPTION}>
                      <Typography>{blog.description}</Typography>
                    </Box>
                    <Box slot={EXPANDED}>
                      <Typography>
                        {blog.content}
                      </Typography>
                    </Box>
                  </BlogCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Content>
    </Root>
  )
}

export default Share
