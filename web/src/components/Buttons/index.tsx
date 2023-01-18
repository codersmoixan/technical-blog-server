/**
 * @author zhengji.su
 * @description Buttons
 */

import Button, { ButtonProps } from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import CircularProgress from "@mui/material/CircularProgress";
import type { Theme } from "@mui/material"
import type { ReactNode } from "react";

interface ButtonsProps extends ButtonProps{
  children: ReactNode;
  className?: string;
  space?: boolean;
  loading?: boolean;
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
      padding: '0 !important',
      margin: '0 !important',
      width: 'auto',
      minWidth: 'auto',
      height: 'auto',
      minHeight: 'auto'
    }
  },
  loading: {
    marginRight: theme.spacing(2)
  }
}))

function Buttons(props: ButtonsProps) {
  const { children, className, space = true, variant, loading, ...other } = props
  const classes = useStyles(props)

  return (
    <Button
      className={clsx(className, {
        [classes.emptySpace]: !space
      })}
      classes={{ root: classes.root }}
      color="primary"
      variant={variant}
      {...other}
    >
      {loading && <CircularProgress color="inherit" size={16} className={classes.loading} />}
      {children}
    </Button>
  )
}

export default Buttons
