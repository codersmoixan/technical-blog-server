import Image from "next/image";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: '10vh',
    height: '80vh',
    zIndex: -1
  },
  deployments: {
    position: 'absolute',
    right: 0
  },
  computerCity: {
    position: 'absolute',
    bottom: 235,
    right: 650
  }
}))

function Backdrop() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 1, type: 'spring', mass: 0.5 }}
      >
        <Image
          src="/svg/deployments.svg"
          alt=""
          width={650}
          height={525}
          className={classes.deployments}
        />
      </motion.div>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 1, type: 'spring', mass: 0.5 }}
      >
        <Image
          src="/svg/computer-city-lines--dark.svg"
          alt="computer-city-lines--dark"
          width={325}
          height={255}
          className={classes.computerCity}
        />
      </motion.div>
    </Box>
  )
}

export default Backdrop
