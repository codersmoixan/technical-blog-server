import axios from "axios";
import type { AxiosInstance } from "axios";
import type { RequestConfig, RequestInterceptors } from "./type";

class Axios {
  instance: AxiosInstance;
  requestConfig: RequestConfig;
  interceptors?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create({
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });
    this.requestConfig = config;
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    );
  }

  async request<T>(method: string, data: T) {
    const result = await this.instance.request({
      url: this.requestConfig.url,
      method,
      data: { ...data },
    });

    return result.data;
  }

  async requestGql<T>(data: T) {
    const result = await this.instance.request({
      url: this.requestConfig.url,
      method: "POST",
      data: { ...data },
    });

    return result.data?.data;
  }
}

export default Axios;
