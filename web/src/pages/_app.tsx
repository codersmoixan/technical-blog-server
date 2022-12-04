import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { SnackbarProvider } from "notistack"

import Navigation from "components/common/Navigation";
import theme from "@/src/theme"
import Footer from "components/common/Footer";
import store from "../store";
import BasicSpeedDial from "components/common/BasicSpeedDial";
import NodeVisible from "components/common/NodeVisible";

import "../assets/common.css"
// import "../assets/prism.js"
import type { AppProps } from 'next/app'
import {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   Prism.highlightAll()
  // }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
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
