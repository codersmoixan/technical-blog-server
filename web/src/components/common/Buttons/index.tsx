/**
 * @author zhengji.su
 * @description Buttons
 */

import * as React from 'react'
import Button, { ButtonProps } from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material"
import clsx from "clsx";

interface ButtonsProps extends ButtonProps{
  children: React.ReactNode,
  className?: string,
  space?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 42,
    borderColor: theme.palette.primary.main,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.MuiButton-textPrimary, &.MuiButton-outlinedPrimary': {
      color: theme.palette.text.primary
    },
    '&.MuiButton-contained': {
      background: theme.palette.primary.main
    },
  },
  emptySpace: {
    '&.MuiButtonBase-root': {
      padding: 0,
      margin: 0,
      width: 'auto',
      minWidth: 'auto',
      height: 'auto',
      minHeight: 'auto'
    }
  }
}))

function Buttons(props: ButtonsProps) {
  const { children, className, space = true, ...other } = props
  const classes = useStyles(props)

  return (
    <Button
      className={clsx({
        [classes.emptySpace]: !space
      }, className)}
      classes={{ root: classes.root }}
      color="primary"
      {...other}
    >
      {children}
    </Button>
  )
}

export default Buttons
