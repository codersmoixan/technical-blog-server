/**
 * @author zhengji.su
 * @description Banner
 */

import Box, { BoxProps } from '@mui/material/Box';
import {makeStyles} from "@mui/styles";
import type { Theme } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: theme.status.backdropHeight,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(11),
    }
  }
}))

function Banner(props: BoxProps) {
  const { className, children, ...other } = props
  const classes = useStyles(props)

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      {children}
    </Box>
  )
}

export default Banner
