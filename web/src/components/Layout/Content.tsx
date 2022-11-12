/**
 * @author zhengji.su
 * @description Content
 */

import React, {useState, useEffect, ReactNode} from 'react'
import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";

interface Props {
  children: ReactNode
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    width: 1376,
  }
}))

function Content({ children }: Props) {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      {children}
    </Box>
  )
}

export default Content
