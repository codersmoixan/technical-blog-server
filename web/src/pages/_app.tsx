import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';

import Navigation from "components/common/Navigation";
import theme from "@/src/theme"
import Footer from "components/common/Footer";
import store from "../store";

import "reset-css"
import "../assets/common.css"

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Box position="relative" zIndex={9}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </ThemeProvider>
    </Provider>
  )
}
