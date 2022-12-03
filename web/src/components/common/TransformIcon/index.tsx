/**
 * @author zhengji.su
 * @description TransformIcon
 */

import Box, { BoxProps } from '@mui/material/Box';
import clsx from "clsx";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import type { ReactNode } from "react";

interface TransformIconProps extends BoxProps{
  focus: boolean;
  originIcon?: ReactNode;
  finishIcon?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: 24,
    height: 24
  },
  icon: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    transition: theme.status.transition(0.5)
  },
  fadeIn: {
    opacity: 0,
    transform: 'rotate(180deg)'
  },
  fadeOn: {
    opacity: 1,
    transform: 'rotate(0deg)'
  }
}))

function TransformIcon(props: TransformIconProps) {
  const { focus, originIcon, finishIcon, color, ...other } = props
  const classes = useStyles(props)

  return (
    <Box className={clsx(classes.root, 'transform-icon')} {...other}>
      <Box className={clsx(classes.icon, focus ? classes.fadeOn : classes.fadeIn)} color={color}>
        {originIcon ?? <RemoveIcon />}
      </Box>
      <Box className={clsx(classes.icon, focus ? classes.fadeIn : classes.fadeOn)} color={color}>
        {finishIcon ?? <AddIcon />}
      </Box>
    </Box>
  )
}

export default TransformIcon
