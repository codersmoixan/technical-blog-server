/**
 * @author zhengji.su
 * @description NavigationBar
 */

import { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Image from "next/image";
import Logo from "public/images/logo.jpg"
import { NAVIGATION_LIST } from "components/Layout/constant";
import type { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Buttons from "components/Buttons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    zIndex: 9999
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
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
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 176,
    height: '100%'
  }
}))

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
          <Box className={classes.search}>

          </Box>
          <Box className={classes.buttons}>
            <Buttons variant="outlined" disableRipple>Log in</Buttons>
            <Buttons variant="contained" disableRipple>Sign up</Buttons>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NavigationBar
