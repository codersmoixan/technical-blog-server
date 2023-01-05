import Axios from "./axios";
import { requestHeader } from "./utils";
import { BASE_API_URL } from "./utils";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestConfig } from "./type";

function requestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig {
  return config;
}

function responseInterceptors(config: AxiosResponse): AxiosResponse {
  console.log(config, '这里是响应拦截器')
  return config;
}

function responseInterceptorsCatch(err: any) {
  console.log(err, "响应失败");
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
