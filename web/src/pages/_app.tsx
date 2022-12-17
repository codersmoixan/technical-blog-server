import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack"
import SetupApp from "containers/App"

import theme from "@/src/theme"
import store from "../store";

import "../assets/common.css"
import type { AppProps } from 'next/app'

export default function App(props: AppProps) {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <SetupApp {...props} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}
