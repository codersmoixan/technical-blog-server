/**
 * @author zhengji.su
 * @description export default Banner
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
    height: theme.status.backdropHeight
  }
}))

function Banner(props: BoxProps) {
  const classes = useStyles()

  return (
    <Box className={clsx(classes.root, props.className)}>
      {props.children}
    </Box>
  )
}

export default Banner
