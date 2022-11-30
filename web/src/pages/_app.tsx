import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';

import Navigation from "components/common/Navigation";
import theme from "@/src/theme"
import Footer from "components/common/Footer";
import store from "../store";

import "../assets/common.css"

import type { AppProps } from 'next/app'
import BasicSpeedDial from "components/common/BasicSpeedDial";
import NodeVisible from "components/common/NodeVisible";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Provider>
  )
}
