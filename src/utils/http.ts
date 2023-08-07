/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import store from "storejs";
import { notification } from "ant-design-vue";
import router from "@/router";

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_APP_TIMEOUT),
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    const accessToken = (<TLoginResponse["data"] | undefined>(
      store.get("arco_auth")
    ))?.accessToken;
    accessToken && (config.headers["Authorization"] = `Bearer ${accessToken}`);
    return config;
  },
  (error) => {
    console.log(error);
  },
);

// 添加响应拦截器
http.interceptors.response.use(
  (option) => {
    const url2Handler: Record<string, () => any> = {
      "/api/v1/users/login": () => store.set("arco_auth", option.data.data),
    };
    url2Handler[option?.config?.url ?? ""]?.();

    return option;
  },
  (error: AxiosError<IBaseResponse>) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      router.push("/401_3");
    } else {
      const networkErrorMessages: { [key: string]: string } = {
        ERR_NETWORK: "网络似乎断开了连接",
        ERR_NETWORK_CHANGED: "网络发生变化",
        ERR_TIMED_OUT: "请求超时",
        ERR_CONNECTION_CLOSED: "连接已关闭",
        ERR_CONNECTION_RESET: "连接被重置",
        ERR_CONNECTION_REFUSED: "连接被拒绝",
        ERR_CONNECTION_ABORTED: "连接被中止",
        ERR_CONNECTION_FAILED: "连接失败",
        ERR_NAME_NOT_RESOLVED: "域名无法解析",
        ERR_INTERNET_DISCONNECTED: "互联网断开连接",
        ERR_ADDRESS_UNREACHABLE: "地址不可达",
        ERR_SSL_PROTOCOL_ERROR: "SSL协议错误",
        ERR_QUIC_PROTOCOL_ERROR: "QUIC协议错误",
        ERR_CONNECTION_TIMED_OUT: "连接超时",
        ERR_ADDRESS_INVALID: "地址无效",
        ERR_EMPTY_RESPONSE: "响应为空",
        ERR_CACHE_MISS: "缓存未命中",
        ERR_REQUEST_ABORTED: "请求被中止",
        ERR_NETWORK_IO_SUSPENDED: "网络I/O已暂停",
      };

      let errorMessage =
        networkErrorMessages[error.code as string] ??
        "有预先未定义的错误，请更新";

      if (error.response?.data) {
        errorMessage = error.response?.data.msg;
      }

      notification.error({
        message: errorMessage,
      });
      return Promise.reject(errorMessage);
    }
  },
);

export default http;
// 通过dot env文件来定义坏境变量
// .env.development
// .env.production
