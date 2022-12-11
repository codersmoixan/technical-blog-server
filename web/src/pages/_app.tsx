import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { SnackbarProvider } from "notistack"
import { motion, useScroll } from "framer-motion";

import Navigation from "components/Navigation";
import theme from "@/src/theme"
import Footer from "components/Footer";
import store from "../store";
import BasicSpeedDial from "components/BasicSpeedDial";
import NodeVisible from "components/NodeVisible";

import "../assets/common.css"
// import "../assets/prism.js"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const { scrollYProgress } = useScroll()

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <motion.div style={{ scaleX: scrollYProgress, height: '3px', backgroundColor: 'red' }} />
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
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}
