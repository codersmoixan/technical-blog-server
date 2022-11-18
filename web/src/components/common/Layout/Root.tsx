/**
 * @author zhengji.su
 * @description Root
 */

import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    zIndex: -1
  }
}))

function Root(props: BoxProps) {
  const classes = useStyles(props)
  const { children, ...other } = props

  return (
    <Box className={classes.root} {...other}>
      {children}
    </Box>
  )
}

export default Root
