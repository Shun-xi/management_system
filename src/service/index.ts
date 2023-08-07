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
export const User = async () =>
  (await http.get<TUserInformation>("/api/v1/users/user_info")).data;
//个人设置
export const Users = async () =>
  (await http.get<ResponseData>("/api/v1/users/user_info")).data.data;

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

// 删除项目
export const DeleteProjectList = async (data: TsongCurrentData) =>
  await http.put<TOngoingProject>("/api/v1/projects", data);

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

// 全部项目
export const featProjectsList = async (
  params:
    | {
        collection: number;
        is_recycle: number;
      }
    | {
        collection: number;
        is_archived: number;
      },
) =>
  (
    await http.get<ResponseDataRows>("/api/v1/projects/list", {
      params,
    })
  ).data.data.rows;

// 项目模板
export const featproject_templates = async (params: {
  is_custom: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<ResponseDataRows>("/api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;

// 上传图片
export const upLoadFileRecord = async (data: FormData) =>
  (
    await http.post<ResponseData_1>("/api/v1/uploads", data, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
  ).data.data;

export const Task = async (params: { prop_order: "sort"; order: "desc" }) =>
  (
    await http.get<ResponseData_2>("/api/v1/task_typesst?prop_order", {
      params,
    })
  ).data.data.rows;
// 收藏
export const feat_project_collects = async (data: {
  project_id: number | undefined;
  user_id: 56;
}) =>
  (await http.post<IBaseResponse>("/api/v1/user_project_collects/change", data))
    .data.data;

// 个人信息
export const featUser_info = async () =>
  (await http.get<TUser_info>("/api/v1/users/user_info")).data.data;

// 修改项目信息
export const ModifyProjectInformation = async (data: TsongCurrentData) =>
  await http.put<IBaseResponse>("/api/v1/projects", data);

// 修改项目信息
export const project_templatesList = async (params: {
  limit: number;
  offset: number;
}) =>
  (
    await http.get<Tproject_templatesList>("/api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;

// 新建项目
export const newBuiltProjectInformation = async (
  data: TnewBuiltProjectInformation,
) => (await http.post<IBaseResponse>("/api/v1/projects", data)).data.msg;

// 私信
// 个人信息
export const FeatMessagesList = async (params: {
  prop_order: "id";
  order: "desc";
  pageNo: 1;
  pageSize: 10;
  keyword: null;
  type: string;
  receiver_id: number | undefined;
  limit: 10;
  offset: 0;
}) =>
  (await http.get<TFeatMessagesList>("/api/v1/messages/list", { params })).data
    .data.rows;
