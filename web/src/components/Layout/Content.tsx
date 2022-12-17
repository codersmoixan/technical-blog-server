/**
 * @author zhengji.su
 * @description Content
 */

import Box, { BoxProps } from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import type { Theme } from "@mui/material";
import type { ReactNode } from "react";

interface ContentProps extends BoxProps{
  className?: string;
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: theme.status.contentWidth,
    [theme.breakpoints.down('md')]: {
      margin: '72px auto 0',
      paddingTop: 0
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 3),
      boxSizing: 'border-box'
    }
  }
}))

function Content(props: ContentProps) {
  const { className, children, ...other } = props
  const classes = useStyles(props)

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      {children}
    </Box>
  )
}

export default Content
