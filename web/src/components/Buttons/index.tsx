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
      textTransform: 'none'
    },
    '&.MuiButton-contained': {
      background: theme.palette.background.default
    },
    '&.MuiButton-outlined': {
      color: theme.palette.text.primary
    }
  }
}))

function Buttons({ children, className, ...other }: ButtonsProps) {
  const classes = useStyles()

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children}
    </Button>
  )
}

export default Buttons
