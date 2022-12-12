/**
 * @author zhengji.su
 * @description Root
 */

import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import type { Theme } from "@mui/material";

interface RootProps extends BoxProps {
  backdrop?: string | StaticImageData;
  alt?: string;
  animate?: boolean;
  bgColor?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    overflowX: 'hidden',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: (props: RootProps) => props.bgColor || theme.palette.background.default,
    zIndex: -1,
  },
  review: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: theme.status.backdropHeight,
    [theme.breakpoints.down('md')]: {
      width: 'auto'
    }
  },
  motion: {
    width: '100%',
    height: '100%'
  }
}))

function Root(props: RootProps) {
  const { children, backdrop = '', alt = '', animate = true, ...other } = props
  const classes = useStyles(props)

  return (
    <Box className={classes.root} {...other}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={classes.motion}
        >
          {backdrop && <Image src={backdrop} alt={alt} className={classes.review} />}
          {children}
        </motion.div>
      ) : (
        <>
          {backdrop && <Image src={backdrop} alt={alt} className={classes.review} />}
          {children}
        </>
      )}
    </Box>
  )
}

export default Root
