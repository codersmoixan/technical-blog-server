import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/styles";
import store from "../store";

import NavigationBar from "components/Layout/NavigationBar";
import theme from "@/src/theme"

import 'reset-css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
