import store from "store";
import Axios from "./axios";
import { requestHeader } from "./utils";
import { BASE_API_URL } from "./utils";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestConfig } from "./type";

function requestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig {
  return config;
}

function responseInterceptors(config: AxiosResponse): AxiosResponse {
  return config;
}

function responseInterceptorsCatch(err: any) {
  console.log(err, "响应失败");
}

function requestConfig(): RequestConfig {
  const storeCode = store.get("store_code");

  // const apiUrl = BASE_API_URL;

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

const baseRequest = new Axios(requestConfig());

export const request = baseRequest.request.bind(baseRequest);

export default baseRequest;
