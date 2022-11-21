import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import store from "../store";

import Navigation from "components/common/Navigation";
import Root from "components/common/Layout/Root";
import theme from "@/src/theme"

import "reset-css"
import "../assets/common.css"

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
