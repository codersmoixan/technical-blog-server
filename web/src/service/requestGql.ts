import Axios from "./axios";
import { requestHeader } from "./utils";
import { BASE_GQL_API_URL } from "./utils";
import type { RequestConfig } from "./type";
import type { AxiosResponse, AxiosRequestConfig } from "axios";

function requestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig {
  return config;
}

function responseInterceptors(config: AxiosResponse): AxiosResponse {
  return config;
}

function responseInterceptorsCatch(err: any) {
  console.log(err, "响应失败");
}

function gqlConfig(): RequestConfig {
  return {
    url: BASE_GQL_API_URL,
    headers: requestHeader(),
    interceptors: {
      requestInterceptors,
      responseInterceptors,
      responseInterceptorsCatch,
    },
  };
}

const request = new Axios(gqlConfig());
export const requestGql = request.requestGql.bind(request);

export default request;
