/**
 * @author zhengji.su
 * @description UserButtons
 */

import React from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import Buttons from "components/Buttons";
import {makeStyles} from "@mui/styles";
import clsx from "clsx";

interface UserButtonsProps extends BoxProps{
  className?: string
}

const useStyles = makeStyles(() => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 176,
    height: '100%'
  },
}))

function UserButtons({ className, ...other }: UserButtonsProps) {
  const classes = useStyles()

  return (
    <Box className={clsx(classes.buttons, className)} {...other}>
      <Buttons variant="outlined" color="primary" disableRipple>Sign in</Buttons>
      <Buttons variant="contained" color="info" disableRipple>Sign up</Buttons>
    </Box>
  )
}

export default UserButtons
