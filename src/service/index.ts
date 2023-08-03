import http from "@/utils/http";

// 用户名 | 邮箱
export const isUserExists = async (
  params: { username: string } | { email: string },
) =>
  (
    await http.get<IBaseResponse>("/api/v1/users/exists_user_unique_fields", {
      params,
    })
  ).data.code;

// 发送验证码
export const sendVerificationCodes = async (data: {
  target: string;
  type: 1;
}) =>
  (await http.post<IBaseResponse>("/api/v1/verification_codes", data)).data
    .code;

// 重置密码
export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
}) => (await http.put<IBaseResponse>("/api/v1/users/password", data)).data.code;

// 注册账号
export const registeredAccount = async (data: {
  email: string;
  code: string;
  username: string;
  password: string;
  passwordConfirm: string;
  avatar: string;
  verification_type: number;
}) => (await http.post<IBaseResponse>("/api/v1/users", data)).data.code;

// 登录账号
export const isUsersLogin = async (data: {
  password: string;
  username: string;
}) => (await http.post<TLoginResponse>("/api/v1/users/login", data)).data.code;

// 用户信息
export const userInformation = async () =>
  (await http.get<TUserInformation>("/api/v1/users/user_info")).data;

// 进行中项目
export const ongoingProject = async (params: {
  is_recycle: number;
  is_archived: number;
}) =>
  (
    await http.get<TOngoingProject>("/api/v1/projects/list", {
      params,
    })
  ).data.data.rows;

// 我的任务
export const myTask = async (params: TMyTaskParams) =>
  (
    await http.get<TMyTask>("/api/v1/tasks/list", {
      params,
    })
  ).data.data;

// 项目者信息
export const projectCreatorInformation = async (params: {
  keyword?: string;
  limit?: number;
  offset?: number;
  project_id?: string | string[];
}) =>
  (
    await http.get<TprojectCreatorInformation>("/api/v1/users/list", {
      params,
    })
  ).data.data;

// 获取路由配置信息
export const routingConfigurationInformation = async () =>
  (await http.get<TroutingConfigurationInformation>("/api/v1/menus/user_menus"))
    .data.data;
