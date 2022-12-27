import baseRequest, { request } from "./request";
import requestGraphql, { requestGql } from "./requestGql";

export const querySetting = {
  initialStale: true,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: false,
};

export { baseRequest, requestGraphql, request, requestGql };
