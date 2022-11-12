/**
 * @author zhengji.su
 * @description NavigationBar
 */

import { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Image from "next/image";
import Logo from "public/images/logo.jpg"
import {NAVIGATION_LIST} from "components/Layout/constant";
import type { Theme } from "@mui/material";
import {Typography} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  content: {
    display: 'flex',
    width: 1408,
  },
  list: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 8),
    height: 80,
  },
  listItem: {
    padding: theme.spacing(0, 3),
    height: '100%',
    lineHeight: '80px',
    cursor: 'pointer',
    transition: `all .3s`,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  tools: {

  },
  search: {

  },
  logo: {
    width: 250,
    height: 80
  }
}), {
  name: 'NavigationBar'
})

function NavigationBar() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Image src={Logo} alt="" className={classes.logo} />
        <Box className={classes.list}>
          {NAVIGATION_LIST.map(item => (
            <Box key={item.id} className={classes.listItem}>
              <Typography component="span">{item.label}</Typography>
            </Box>
          ))}
        </Box>
        <Box className={classes.tools}>
          <Box className={classes.search}></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NavigationBar
