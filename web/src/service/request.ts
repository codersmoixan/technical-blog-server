import Axios from "./axios";
import store from "../store/index"
import { requestHeader } from "./utils";
import { BASE_API_URL } from "./utils";
import { enqueueSnackbar } from "components/Snackbar/slice";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestConfig } from "./type";

function requestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig {
  return config;
}

function responseInterceptors(config: AxiosResponse): AxiosResponse {
  const { data } = config
  if (data.code !== 0) {
    const { dispatch } = store
    dispatch(enqueueSnackbar({
      message: data.msg,
      key: new Date().getTime(),
      variant: 'warning'
    }))
  }

  return config;
}

function responseInterceptorsCatch(err: any) {
  const { dispatch } = store
  dispatch(enqueueSnackbar({
    message: err.message,
    key: new Date().getTime(),
    variant: 'error'
  }))

  return Promise.reject(err)
}

function requestConfig(): RequestConfig {
  return {
    url: BASE_API_URL,
    headers: requestHeader(),
    interceptors: {
      requestInterceptors,
      responseInterceptors,
      responseInterceptorsCatch,
    },
  };
}

const axios = new Axios(requestConfig());

export const request = axios.request.bind(axios);

export default axios;
