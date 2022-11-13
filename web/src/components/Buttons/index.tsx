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
  className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiButtonBase-root': {
      height: 42,
      borderColor: theme.palette.primary.main,
      textTransform: 'none',
    },
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&.MuiButton-textPrimary, &.MuiButton-outlinedPrimary': {
      color: theme.palette.text.primary
    },
    '&.MuiButton-contained': {
      background: theme.palette.background.default
    },
  }
}))

function Buttons(props: ButtonsProps) {
  const { children, className, ...other } = props
  const classes = useStyles(props)

  return (
    <Button
      className={clsx(classes.root, className)}
      color="primary"
      {...other}
    >
      {children}
    </Button>
  )
}

export default Buttons
