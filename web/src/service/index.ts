import axios, { request } from "./request";
import axiosGraphql, { requestGql } from "./requestGql";

export const GET = <T = any>(url: string, data?: T) => request('GET', url, { params: data })
export const POST = <T>(url: string, data?: T) => request('POST', url, { data })
export const PUT = <T>(url: string, data?: T) => request('PUT', url, { data })
export const DELETE = <T>(url: string, data?: T) => request('DELETE', url, { params: data })

export {
  axios,
  axiosGraphql,
  request,
  requestGql
};
