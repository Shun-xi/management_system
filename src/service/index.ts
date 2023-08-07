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

// 部门
export const departmentInformation = async (params: {
  keyword: string;
  department_id?: number;
  date_after_created?: string;
  state?: number;
}) => (await http.get<TuserData>("/api/v1/users/list", { params })).data;

// 部门名称
export const departmentName = async () =>
  (await http.get<TuserData>("api/v1/departments/list")).data;

// 成员详情
export const memberDetails = async (params: { id: number }) =>
  (await http.get<TuserData>("/api/v1/users?", { params })).data;

// 启用禁止
export const EnableProhibit = async (data: { id: number; state: 0 | 1 }) =>
  await http.put("/api/v1/users", data);

// 编辑部门
export const EditingDepartment = async (data: {
  id: number;
  name: string;
  owner_id: number;
  parent_id: number;
  sort: number;
  created_at: string;
  updated_at: string;
}) => await http.put<TuserData>("/api/v1/departments", data);
// 更改用户状态 移出
export const changeUserStatusRemove = async (data: {
  project_id: number;
  user_id: number;
}) =>
  (
    await http.delete<TprojectCreatorInformation>(
      "/api/v1/user_projects/quit",
      {
        data,
      },
    )
  ).data;

// 更改用户状态 邀请
export const changeUserStatusInvite = async (data: {
  group: string;
  group_id: number;
  receiver_id: number;
}) => (await http.post<TLoginResponse>("/api/v1/invites", data)).data;

// 回收站 任务
export const recycleBinTasks = async (params: {
  project_id: number;
  is_recycle: number;
}) =>
  (
    await http.get<TRecycleBinTasks>("/api/v1/tasks/list", {
      params,
    })
  ).data.data;

// 回收站 文件
export const recycleBinFiles = async (params: {
  project_id: number;
  is_recycle: number;
}) =>
  (
    await http.get<TRecycleBinFiles>("/api/v1/project_files/list", {
      params,
    })
  ).data.data;

// 永久删除文件
export const permanentlyDeleteFiles = async (data: { ids: number[] }) =>
  (
    await http.delete("/api/v1/project_files", {
      data,
    })
  ).data;

// 永久删除任务
export const permanentlyDeleteTasks = async (data: { ids: number[] }) =>
  (
    await http.delete("/api/v1/tasks", {
      data,
    })
  ).data;

//还原文件
export const restoreFiles = async (data: restoreFilesParameter) =>
  (await http.put<IBaseResponse>("/api/v1/project_files", data)).data;

// 还原任务
export const restoreTask = async (data: TrestoreTask) =>
  (await http.put<IBaseResponse>("/api/v1/tasks", data)).data;

// 获取任务列表
export const getTaskList = async (params: {
  project_id: number;
  prop_order: string;
  order: string;
}) =>
  (
    await http.get<TgetTaskList>("/api/v1/task_lists/list", {
      params,
    })
  ).data.data;

// 获取当前任务列表内所有任务
export const getAllTasksInTheCurrentTaskList = async (params: {
  task_list_id: number;
  prop_order: string;
  order: string;
}) =>
  (
    await http.get<TgetAllTasksInTheCurrentTaskList>("/api/v1/tasks/list", {
      params,
    })
  ).data.data;

// 创建任务列表
export const getCreateTaskList = async (data: {
  name: string;
  project_id: number;
}) => (await http.post<IBaseResponse>("/api/v1/task_lists", data)).data.data;

// 修改任务列表名称
export const modifyTaskListName = async (data: {
  created_at: string;
  doneTasks: any[];
  id: number;
  loading: boolean;
  name: string;
  project_id: number;
  sort: number;
  tasks: any[];
  undoneTasks: any[];
  updated_at: string;
}) => (await http.put<IBaseResponse>("/api/v1/task_lists", data)).data;

// 本列所有任务移至回收站
export const moveAllTasksInThisColumnToTheRecycleBin = async (data: {
  task_list_id: number;
}) =>
  (
    await http.put<IBaseResponse>(
      "/api/v1/tasks/recycle_all_task_of_taskList",
      data,
    )
  ).data;

// 删除列表
export const getDeleteList = async (data: { ids: number[] }) =>
  (
    await http.delete("/api/v1/task_lists", {
      data,
    })
  ).data;

// 创建任务
export const getCreateTask = async (data: {
  name: string;
  task_list_id: number;
  task_type_id: number;
  task_state_id: number;
  task_priority_id: number;
  executor_id: number;
  project_id: number;
}) => (await http.post<TLoginResponse>("/api/v1/tasks", data)).data;

//所有项目
export const allItem = async (params: { limit: string }) =>
  (await http.get<TAllItem>("/api/v1/projects/list", { params })).data.data;

//概览
export const overview = async (params: { id: string }) =>
  (await http.get<TOverviewData>("/api/v1/projects/statistics", { params }))
    .data.data;

//概览下部分
export const OverviewDetails = async (params: {
  project_id: string;
  limit?: string;
  offset?: string;
  prop_order?: "id";
  order?: "desc";
}) =>
  (await http.get<TaskLogData>("/api/v1/task_logs/list", { params })).data.data;

// 获取用户信息
export const UserInformation = async () =>
  (await http.get<IBaseResponse<UserInforData>>("/api/v1/users/user_info")).data
    .data;

// 获取项目数量
export const ProjectNumber = async (params: {
  is_recycle: number;
  is_archived: number;
}) =>
  (
    await http.get("/api/v1/projects/list", {
      params,
    })
  ).data.data.rows;

// 获取我的任务数据
export const MyAssignment = async (params: TMyTaskParams) =>
  (
    await http.get("/api/v1/tasks/list", {
      params,
    })
  ).data.data;

// 获取用户项目数据
export const UserFileName = async (params: { project_id: number }) =>
  (await http.get("/api/v1/users/list", { params })).data.data;

// 获取文件内部数据
export const FileCreate = async (params: {
  project_id: number;
  prop_order: string;
  order: string;
}) => (await http.get("/api/v1/project_files/list", { params })).data.data;

// 上传文件数据请求
export const UploadFile = async (fd: FormData) =>
  (
    await http.post("/api/v1/uploads", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data.data;

export const ImgProjectFiles = async (params: IdataUrl) =>
  await http.post("/api/v1/project_files", params);

// 还原任务
export const modificationCompletionStatus = async (
  data: TmodificationCompletionStatus,
) => (await http.put<IBaseResponse>("/api/v1/tasks", data)).data;

export const task = async (params: { id: number }) =>
  (
    await http.get<TaskData>("/api/v1/tasks", {
      params,
    })
  ).data.data;
//  任务数据相关用户
export const task_name = async (params: { project_id: number }) =>
  (
    await http.get<ResponseData_ass>("/api/v1/users/list", {
      params,
    })
  ).data.data;
