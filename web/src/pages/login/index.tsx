/**
 * @author zhengji.su
 * @description Login
 */

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  }
}))

function Login() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      Login
    </Box>
  )
}

export default Login
