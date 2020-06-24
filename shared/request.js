import axios from "axios";
import { Message, MessageBox } from "element-ui";
import {
  ERR_MESSAGE_SHOW_DURATION,
  REQ_OVERTIME_DURATION,
  RES_PERMISSION_DENIED_CODE,
  RES_SUCCESS_DEFAULT_CODE,
  RES_UNAUTHORIZED_CODE
} from "./constants";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: REQ_OVERTIME_DURATION // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  response => {
    const res = response.data;
    // if the custom code is not 2000, it is judged as an error.
    if (res.code !== RES_SUCCESS_DEFAULT_CODE) {
      // 4010: Illegal token; Other clients logged in;  Token expired;
      if (res.code === RES_UNAUTHORIZED_CODE) {
        // to re-login
        MessageBox.confirm(
          "您已经登出，您可以取消以停留在此页面，或再次登录",
          "确认注销",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          logout();
        });
      } else if (res.code === RES_PERMISSION_DENIED_CODE) {
        // token不存在,请重新登录账户
        Message({
          message: res.desc || res.message || "Error",
          type: "error",
          duration: ERR_MESSAGE_SHOW_DURATION
        });
        setTimeout(() => {
          logout();
        }, 1000);
      } else {
        Message({
          message: res.desc || res.message || "Error",
          type: "error",
          duration: ERR_MESSAGE_SHOW_DURATION
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err", error); // for debug
    Message({
      message: error.desc || error.message || "服务器出错",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export function post(endpoint, params) {
  return service.post(endpoint, params);
}

export function get(endpoint, params) {
  return service.get(endpoint, {
    params: { ...params }
  });
}

export default service;
