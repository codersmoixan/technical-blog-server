/**
 * @author zhengji.su
 * @description App
 */

import Box from '@mui/material/Box';
import { motion, useScroll } from "framer-motion";
import { makeStyles } from "@mui/styles";
import NodeVisible from "components/NodeVisible";
import Navigation from "components/Navigation";
import BasicSpeedDial  from "containers/App/components/BasicSpeedDial";
import Footer from "components/Footer";
import Snackbar from "components/Snackbar";
import PopupLayer from "containers/App/components/PopupLayer";
import type { AppProps } from "next/app";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  scrollProgress: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: 2,
    transformOrigin: '0%',
    backgroundColor: theme.palette.primary.main,
    zIndex: 9999,
  }
}))

function App({ Component, pageProps }: AppProps) {
  const classes = useStyles()
  const { scrollYProgress } = useScroll()

  return (
    <Box>
      <motion.div style={{ scaleX: scrollYProgress }} className={classes.scrollProgress} />
      <NodeVisible>
        <Navigation />
      </NodeVisible>
      <Box position="relative" zIndex={9}>
        <Component {...pageProps} />
        <NodeVisible>
          <BasicSpeedDial />
        </NodeVisible>
      </Box>
      <NodeVisible>
        <Footer />
      </NodeVisible>
      <Snackbar />
      <PopupLayer />
    </Box>
  )
}

export default App
