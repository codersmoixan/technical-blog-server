/**
 * @author zhengji.su
 * @description Root
 */

import Box, { BoxProps } from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface RootProps extends BoxProps {
  backdrop?: string | StaticImageData;
  alt?: string;
  animate?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    zIndex: -1
  },
  review: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 580,
  }
}))

function Root(props: RootProps) {
  const classes = useStyles(props)
  const { children, backdrop = '', alt = '', animate = true, ...other } = props

  return (
    <Box className={classes.root} {...other}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
