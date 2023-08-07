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
type TFeatMessagesList = {
  code: number;
  data: {
    count: number;
    rows: {
      id: number;
      actor_id: number;
      receiver_id: number;
      content: string;
      is_read: number;
      type: string;
      url: string;
      created_at: string;
      updated_at: string;
      actor: { username: string; id: number; avatar: string };
    }[];
  };
  msg: string;
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
  _rawValue: any;
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

type TUserInformation = ResponseData<IUserInformationData>;

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

interface IBaseResponse<T = null> {
  code: 0 | 404 | 40000;
  data: T;
  msg: string;
}

type TLoginResponse = IBaseResponse<{
  accessToken: string;
  refreshToken: string;
  csrf: string;
}>;
type ResponseData = ResponseData<{
  username: string;
  email: string;
  avatar: string;
}>;

type ResponseData_1 = {
  code: number;
  data: {
    filename: string;
    path: string;
    file_type: string;
    size: string;
    extension: string;
  };
  msg: string;
};

type TnewBuiltProjectInformation = {
  id: string;
  cover: string;
  name: string;
  manager_id: number;
  project_template_id: number;
  intro: string;
};
type Tproject_templatesList = {
  code: number;
  data: {
    count: number;
    rows: [
      {
        id: number;
        name: string;
        cover: string;
        is_custom: number;
        intro: string;
        created_at: string;
        updated_at: string;
        project_template_tasks: {
          id: number;
          name: string;
          project_template_id: number;
          sort: number;
        }[];
      },
      {
        id: number;
        name: string;
        cover: string;
        is_custom: number;
        intro: string;
        created_at: string;
        updated_at: string;
        project_template_tasks: {
          id: number;
          name: string;
          project_template_id: number;
          sort: number;
        }[];
      },
      {
        id: number;
        name: string;
        cover: string;
        is_custom: number;
        intro: string;
        created_at: string;
        updated_at: string;
        project_template_tasks: {
          id: number;
          name: string;
          project_template_id: number;
          sort: number;
        }[];
      },
      {
        id: number;
        name: string;
        cover: string;
        is_custom: number;
        intro: string;
        created_at: string;
        updated_at: string;
        project_template_tasks: undefined[];
      },
      {
        id: number;
        name: string;
        cover: string;
        is_custom: number;
        intro: string;
        created_at: string;
        updated_at: string;
        project_template_tasks: undefined[];
      },
    ];
  };
  msg: string;
};
type ResponseData_2 = {
  code: number;
  data: {
    count: number;
    rows: {
      id: number;
      name: string;
      color: string;
      icon: string;
      sort: number;
      created_at: string;
      updated_at: string;
    }[];
  };
  msg: string;
};
type ResponseDataRows = {
  code: number;
  data: {
    count: number;
    rows: [
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
          id: number;
          user_id_github: number;
          username: string;
          department_id: number;
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
          id: number;
          user_id_github: number;
          username: string;
          department_id: number;
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
          id: number;
          user_id_github: number;
          username: string;
          department_id: number;
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
      {
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
        creator: { username: string; id: number; avatar: string };
        collector: undefined[];
        member: {
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
          deleted_at: object;
          user_projects: {
            id: number;
            user_id: number;
            project_id: number;
            created_at: string;
            updated_at: string;
          };
        }[];
      },
    ];
  };
  msg: string;
};
type ResponseUpData = {
  code: number;
  data: {
    filename: string;
    path: string;
    file_type: string;
    size: string;
    extension: string;
  };
  msg: string;
};
type TUser_info = {
  code?: number;
  data: {
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
    roles: {
      id: number;
      name: string;
      is_default: number;
      created_at: string;
      updated_at: string;
      user_roles: {
        id: number;
        user_id: number;
        role_id: number;
        created_at: string;
        updated_at: string;
      };
      permissions: {
        id: number;
        url: string;
        action: string;
        role_permissions: {
          id: number;
          role_id: number;
          permission_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }[];
    permissions: string[];
  };
  msg?: string;
};

type TsongCurrentData = {
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
  creator: { username: string; id: number; avatar: string };
  collector: {
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
    deleted_at: object;
    user_project_collects: {
      id: number;
      user_id: number;
      project_id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
  member: {
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
    deleted_at: object;
    user_projects: {
      id: number;
      user_id: number;
      project_id: number;
      created_at: string;
      updated_at: string;
    };
  }[];
};

type Trows =
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[]; // import { nextTick } from "vue";
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
      id: number;
      name: string;
      parent_id: number;
      manager_id: number;
      project_template_id: number;
      progress: number;
      cover: string;
      is_recycle: number;
      is_archived: number;
      is_private: number; // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
      is_auto_progress: number;
      state: number;
      intro: string;
      created_at: string;
      updated_at: string;
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        created_at: string; // 点击收藏
        updated_at: string;
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
      id: number; // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
      name: string; // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object /* Components */;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
        id: number;
        user_id_github: number;
        username: string;
        department_id: number;
        nickname: string;
        email: string;
        state: number;
        phone: string;
        avatar: string;
        company: string;
        city: string;
        last_login: string;
        created_at: string /* CSS variable injection */;
        updated_at: string;
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
        id: number;
        user_id_github: number;
        username: string;
        department_id: number;
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
        id: number;
        user_id_github: number;
        username: string;
        department_id: number;
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
      id: number;
      name: string;
      parent_id: number;
      manager_id: number;
      project_template_id: number; ////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="), }));
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
        id: number;
        user_id_github: number;
        username: string;
        department_id: object;
        nickname: string;
        email: string;
        state: number;
        phone: number;
        string;
        avatar: string;
        company: string;
        city: string;
        last_login: string;
        created_at: string;
        updated_at: string;
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    }
  | {
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
      creator: { username: string; id: number; avatar: string };
      collector: undefined[];
      member: {
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
        deleted_at: object;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    };
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

// 获取用户信息
type TuserData = IBaseResponse<TabulationResponse, NameResponse, EditResponse>;

type TabulationResponse = {
  count: number;
  rows: [
    {
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
    {
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
      projects: undefined[];
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
    {
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
      department: { name: string };
    },
  ];
};

type NameResponse = {
  code: number;
  data: {
    count: number;
    rows: {
      id: number;
      name: string;
      owner_id: number;
      parent_id: number;
      sort: number;
      created_at: string;
      updated_at: string;
    }[];
  };
  msg: string;
};
// 编辑部门
type EditResponse = {
  id: number;
  name: string;
  owner_id: number;
  parent_id: number;
};
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

type TaskData = {
  code: number;
  data: {
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
    participators: {
      id: number;
      username: string;
      avatar: string;
      user_tasks: {
        id: number;
        user_id: number;
        task_id: number;
        project_id: number;
        created_at: string;
        updated_at: string;
      };
    }[];
    project: {
      id: number;
      name: string;
      member: {
        id: number;
        username: string;
        user_projects: {
          id: number;
          user_id: number;
          project_id: number;
          created_at: string;
          updated_at: string;
        };
      }[];
    };
    likers: undefined[];
  };
  msg: string;
};
type ResponseData_ass = {
  code: number;
  data: {
    count: number;
    rows: {
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
    }[];
  };
  msg: string;
};
