import baseRequest, { request } from "./request";
import requestGraphql, { requestGql } from "./requestGql";

export const querySetting = {
  initialStale: true,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: false,
};

export const GET = <T>(url: string, data?: T) => request('GET', url, data)
export const POST = <T>(url: string, data?: T) => request('POST', url, data)
export const PUT = <T>(url: string, data?: T) => request('PUT', url, data)
export const DELETE = <T>(url: string, data?: T) => request('DELETE', url, data)

export {
  baseRequest,
  requestGraphql,
  request,
  requestGql
};
