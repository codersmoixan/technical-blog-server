/**
 * @author zhengji.su
 * @description Content
 */

import React, {useState, useEffect, ReactNode} from 'react'
import Box, { BoxProps } from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";

interface ContentProps extends BoxProps{
  className?: string;
  children: ReactNode;
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    width: 1376,
  }
}))

function Content({ className, children, ...other }: ContentProps) {
  const classes = useStyles()

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      {children}
    </Box>
  )
}

export default Content
