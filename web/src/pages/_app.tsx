import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/styles";
import store from "../store";

import Index from "components/common/Navigation";
import theme from "@/src/theme"

import 'reset-css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Index />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
