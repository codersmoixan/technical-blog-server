/**
 * @author zhengji.su
 * @description SharingRoot
 */

import React, { useRef, ReactNode } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import ArrowBack from "@mui/icons-material/ArrowBack"
import MediaQuery from "components/MediaQuery";
import CatalogMenu from "containers/Sharing/components/CatalogMenu";
import Content from "components/Layout/Content";
import Root from "components/Layout/Root";
import SearchFormText from "components/Form/SearchFormText";
import Banner from "components/Layout/Banner";
import { options } from "../constants"
import type { Theme } from "@mui/material";
import type { StaticImageData } from "next/image";
import useSeparateChildren from "hooks/common/useSeparateChildren";

interface SharingRootProps {
  backdrop?: string | StaticImageData;
  children: ReactNode;
}

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
      padding: theme.spacing(0, 3),
      width: 'calc(100% - 253px)',
      boxSizing: 'border-box'
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
}))

function SharingRoot({ children, backdrop }: SharingRootProps) {
  const classes = useStyles()
  const theme = useTheme()
  const { content, banner } = useSeparateChildren(children, ['content', 'banner'])

  const pointRef = useRef<HTMLElement | null>(null)
  const searchRef = useRef<HTMLElement | null>(null)

  const handleSearchFocus = () => {
    searchRef.current?.focus()
  }

  return (
    <Root backdrop={backdrop}>
      <Content>
        <Banner className={classes.banner}>
          {banner ?? (
            <>
              <Typography variant="h2" fontWeight={400}>
                总结和分享
              </Typography>
              <Typography variant="h2" fontWeight={400}>
                会有意想不到的收获
              </Typography>
            </>
          )}
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
          <CatalogMenu menus={options} onSearchFocus={handleSearchFocus} ref={pointRef} />
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
            {content}
          </Box>
        </Box>
      </Content>
    </Root>
  )
}

export default SharingRoot
