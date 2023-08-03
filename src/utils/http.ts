/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import store from "storejs";
import { notification } from "ant-design-vue";

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
    let errorMessage = "有预先未定义的错误，请更新";

    if (error.code === "ERR_NETWORK") {
      errorMessage = "网络似乎断开了连接";
    }

    if (error.response?.data) {
      errorMessage = error.response?.data.msg;
    }

    notification.error({
      message: errorMessage,
    });
    return Promise.reject(errorMessage);
  },
);

export default http;
// 通过dot env文件来定义坏境变量
// .env.development
// .env.production
