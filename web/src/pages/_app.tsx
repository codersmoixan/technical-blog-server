import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack"
import SetupApp from "containers/App"

import theme from "@/src/theme"
import store from "../store";

import "../assets/common.css"
import type { AppProps } from 'next/app'

export default function App(props: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <SetupApp {...props} />
          </SnackbarProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Provider>
  )
}
