interface IBaseResponse<T = null> {
  code: 0 | 404 | 40000;
  data: T;
  msg: string;
}
type ResponseData = {
  data: {
    username: string;
    email: string;
    avatar: {
      img: string;
      url: string;
    };
    value: string;
    _rawValue: string;
  };
};

type TLoginResponse = IBaseResponse<{
  accessToken: string;
  refreshToken: string;
  csrf: string;
}>;

type TOngoingProject = IBaseResponse<IOngoingProjectData>;

interface IOngoingProjectData {
  count: number;
  rows: IOngoingProjectRow[];
}

interface IOngoingProjectRow {
  id: number;
  name: string;
  parent_id: number;
  manager_id: number;
  project_template_id: number;
  progress: number;
  cover: string;
  is_recycle: number;
  is_archived: number;
  is_private: number;
  is_auto_progress: number;
  state: number;
  intro: string;
  created_at: string;
  updated_at: string;
  creator: IOngoingProjectCreator;
  collector: any[];
  member: IOngoingProjectMember[];
}

interface IOngoingProjectMember {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: number;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  user_projects: IOngoingProjectUserprojects;
}

interface IOngoingProjectUserprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface IOngoingProjectCreator {
  username: string;
  id: number;
  avatar: string;
}

type TUserInformation = IBaseResponse<IUserInformationData>;

interface IUserInformationData {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  roles: IUserInformationRole[];
  permissions: string[];
}

interface IUserInformationRole {
  id: number;
  name: string;
  is_default: number;
  created_at: string;
  updated_at: string;
  user_roles: IUserInformationUserroles;
  permissions: IUserInformationPermission[];
}

interface IUserInformationPermission {
  id: number;
  url: string;
  action: string;
  role_permissions: IUserInformationRolepermissions;
}

interface IUserInformationRolepermissions {
  id: number;
  role_id: number;
  permission_id: number;
  created_at: string;
  updated_at: string;
}

interface IUserInformationUserroles {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}

type TMyTask = IBaseResponse<IMyTaskData>;
interface IMyTaskData {
  count: number;
  rows: IMyTaskRows[] | null | undefined;
}

interface IMyTaskRows {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  remark?: any;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: any[];
  executor: IMyTaskExecutor;
  participators: IMyTaskExecutor[];
  project: IMyTaskProject;
  likers: any[];
}

interface IMyTaskProject {
  id: number;
  name: string;
  member: IMyTaskMember[];
}

interface IMyTaskMember {
  id: number;
  username: string;
}

interface IMyTaskExecutor {
  username: string;
  id: number;
  avatar: string;
}

type TMyTaskParams =
  | {
      limit: number;
      offset: number;
      is_done: number;
      is_recycle: number;
      executor_ids: number;
    }
  | {
      limit: number;
      offset: number;
      is_done: number;
      is_recycle: number;
      participator_id: number;
    }
  | {
      limit: number;
      offset: number;
      is_done: number;
      is_recycle: number;
      creator_id: number;
    };

type TprojectCreatorInformation = IBaseResponse<TprojectCreatorInformationData>;
type TprojectCreatorInformationData = {
  count: number;
  rows: TprojectCreatorInformationRows[];
};

type TprojectCreatorInformationRows = {
  id: number;
  user_id_github: number;
  username: string;
  department_id: object;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  projects: {
    id: number;
    user_projects: {
      id: number;
      user_id: number;
      project_id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
  roles: {
    id: number;
    name: string;
    user_roles: {
      id: number;
      user_id: number;
      role_id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
  department: object;
};

type TroutingConfigurationInformation =
  IBaseResponse<TroutingConfigurationInformationData>;
type TroutingConfigurationInformationData = [
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: string;
    component: string;
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: object;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: object;
    title: object;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: object;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: object;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: object;
    component: string;
    redirect: object;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  },
];

type TRecycleBinTasks = IBaseResponse<TRecycleBinTasksData>;
type TRecycleBinTasksData = {
  count: number;
  rows: TRecycleBinTasksRows[];
};
type TRecycleBinTasksRows = {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  remark: string;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: undefined[];
  executor: object;
  participators: { id: number; username: string; avatar: string }[];
  project: {
    id: number;
    name: string;
    member: { id: number; username: string }[];
  };
  likers: undefined[];
};

type TRecycleBinFiles = IBaseResponse<TRecycleBinFilesData>;
type TRecycleBinFilesData = {
  count: number;
  rows: TRecycleBinFilesrows[];
};
type TRecycleBinFilesrows = {
  id: number;
  title: string;
  project_id: number;
  task_id: object;
  creator_id: number;
  filename: string;
  path: string;
  extension: string;
  file_type: string;
  size: number;
  downloads: number;
  is_recycle: number;
  created_at: string;
  updated_at: string;
  deleted_at: object;
};

type restoreFilesParameter = {
  id: number;
  title: string;
  project_id: number;
  creator_id: number;
  filename: string;
  path: string;
  extension: string;
  file_type: string;
  size: number;
  downloads: number;
  is_recycle: number;
  created_at: string;
  updated_at: string;
};

type TrestoreTask = {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: undefined[];
  participators: { id: number; username: string; avatar: string }[];
  project: {
    id: number;
    name: string;
    member: { id: number; username: string }[];
  };
  likers: undefined[];
};

type TgetTaskList = IBaseResponse<TgetTaskListData>;
type TgetTaskListData = {
  count: number;
  rows: TgetTaskListRowsData[];
};
type TgetTaskListRowsData = {
  id: number;
  name: string;
  project_id: number;
  sort: number;
  created_at: string;
  updated_at: string;
};

type TgetAllTasksInTheCurrentTaskList =
  IBaseResponse<TgetAllTasksInTheCurrentTaskListData>;
type TgetAllTasksInTheCurrentTaskListData = {
  count: number;
  rows: {
    id: number;
    name: string;
    creator_id: number;
    project_id: number;
    parent_id: number;
    task_list_id: number;
    task_state_id: number;
    task_type_id: number;
    task_priority_id: number;
    executor_id: number;
    start_date: string;
    end_date: string;
    remark: object;
    is_done: number;
    is_privacy: number;
    is_recycle: number;
    likes: number;
    plan_work_hours: number;
    sort: number;
    created_at: string;
    updated_at: string;
    task_tags: undefined[];
    executor: { username: string; id: number; avatar: string };
    participators: { id: number; username: string; avatar: string }[];
    project: {
      id: number;
      name: string;
      member: { id: number; username: string }[];
    };
    likers: undefined[];
  }[];
};

type TaskLogData = IBaseResponse<{
  count: number;
  rows: {
    id: number;
    remark: string;
    task_id: number;
    project_id: number;
    operator_id: number;
    icon: string;
    content: string;
    is_comment: number;
    type: string;
    created_at: string;
    updated_at: string;
    operator: {
      id: number;
      user_id_github: number;
      username: string;
      department_id: number | null;
      nickname: string;
      password: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      deleted_at: string | null;
    };
    task: { id: number; name: string };
  };
}>;

type TOverviewData = IBaseResponse<{
  taskCount: number;
  done: number;
  undone: number;
  overdue: number;
  unreceived: number;
  dueToday: number;
  completedOverdue: number;
  taskPriority: {
    [key: string]: number;
  };
  taskState: {
    [key: string]: number;
  };
  taskType: {
    [key: string]: number;
  };
}>;

type TAllItem = IBaseResponse<{
  count: number;
  rows: {
    id: number;
    name: string;
    parent_id: number;
    manager_id: number;
    project_template_id: number;
    progress: number;
    cover: string;
    is_recycle: number;
    is_archived: number;
    is_private: number;
    is_auto_progress: number;
    state: number;
    intro: string;
    created_at: string;
    updated_at: string;
    creator: {
      username: string;
      id: number;
      avatar: string;
    };
    collector: never[]; // Assuming it's an array of any type
    member: {
      id: number;
      user_id_github: number;
      username: string;
      department_id: number | null;
      nickname: string;
      email: string;
      state: number;
      phone: string;
      avatar: string;
      company: string;
      city: string;
      last_login: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      user_projects: {
        id: number;
        user_id: number;
        project_id: number;
        created_at: string;
        updated_at: string;
      };
    };
  };
}>;

interface UserInforData {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: string[];
}

interface IdataUrl {
  creator_id: number;
  extension: string;
  file_type: string;
  filename: string;
  path: string;
  project_id: number;
  size: string;
  title: string;
}

interface IdataUrl {
  creator_id: number;
  extension: string;
  file_type: string;
  filename: string;
  path: string;
  project_id: number;
  size: string;
  title: string;
}

type TmodificationCompletionStatus = {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: undefined[];
  participators: { id: number; username: string; avatar: string }[];
  project: {
    id: number;
    name: string;
    member: { id: number; username: string }[];
  };
  likers: undefined[];
  type: {
    id: number;
    name: string;
    color: string;
    icon: string;
    sort: number;
    created_at: string;
    updated_at: string;
    disabled: boolean;
  };
  state: {
    id: number;
    name: string;
    color: string;
    icon: string;
    sort: number;
    created_at: string;
    updated_at: string;
    disabled: boolean;
  };
  priority: {
    id: number;
    name: string;
    color: string;
    sort: number;
    created_at: string;
    updated_at: string;
    disabled: boolean;
  };
};
