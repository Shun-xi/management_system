<template>
  <div class="projectList">
    <a-layout>
      <!-- 头部，白色背景，无内容 -->
      <a-layout-header style="background: #fff; padding: 0" />
      <!-- 项目列表 -->
      <a-layout-content style="margin: 0 16px" v-if="numIndex < 5">
        <!-- 顶部导航栏 -->
        <div class="p-[20px] overflow-hidden w-[78vw] h-[100%] bg-[#F4F4F4]">
          <!-- 顶部项目列表的选项卡 -->
          <a-tabs
            v-model:activeKey="activeKey"
            :tab-position="modeTop"
            :animated="false"
            class="bg-[#fff] p-[20px]"
            :style="{ height: '100%', width: '100%' }"
          >
            <!-- 顶部单个项目的选项卡面板 -->
            <a-tab-pane v-for="item in projectList" :key="item.ID">
              <template #tab>
                <!-- 每个选项卡的内容 -->
                <div class="flex items-center" @click="indexs(item.ID)">
                  <!-- 项目名称 -->
                  {{ item.Test }}
                </div>
              </template>
              <allProjects :numIndex="numIndex" />
            </a-tab-pane>
            <!-- 顶部导航栏右侧的额外内容 -->
            <template #rightExtra>
              <a-button
                @click="showModal"
                type="primary"
                class="bg-[#409EFF] h-[40px] flex items-center justify-center text-[14px]"
              >
                <Icon icon="mdi:add" class="text-[18px]" />
                创建新项目
              </a-button>
            </template>
          </a-tabs>
        </div>
        <!-- 顶部导航栏结束 -->
      </a-layout-content>

      <!-- 消息通知 -->
      <a-layout-content
        style="margin: 0 0"
        v-if="numIndex >= 5 && numIndex < 8"
      >
        <!-- 顶部导航栏 -->
        <div class="p-[20px] overflow-hidden w-[100%] h-[100%] bg-[#F4F4F4]">
          <messageNotification />
        </div>
        <!-- 顶部导航栏结束 -->
      </a-layout-content>
    </a-layout>
  </div>
  <!-- 创建新项目蒙版 -->
  <div id="components-modal-demo-position" class="h-[100%]">
    <a-modal
      v-model:open="modal4Visible"
      title="添加项目"
      centered
      :footer="null"
      @ok="modal4Visible = false"
      :width="330"
      :height="500"
    >
      <div class="w-[100%] border"></div>
      <div
        @click="isshowModalImg"
        class="cursor-pointer overflow-hidden add_btn w-[290px] h-[160px] border border-[#ccc] rounded-[6px] mt-[30px] mb-[22px] flex items-center justify-center text-[#737478]"
      >
        <div v-if="str == ''">
          <Icon icon="clarity:add-line" width="36" />添加封面
        </div>

        <img v-else :src="'http://192.168.122.36:1024' + str" alt="" />
      </div>
      <div class="w-[290px] h-[40px] mb-[22px]">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入项目名称' }]"
          >
            <a-input
              v-model:value="formState.username"
              placeholder="项目名称(必须)"
              class="w-[290px] h-[40px]"
            />
          </a-form-item>
        </a-form>
      </div>
      <div class="w-[290px] h-[40px] mb-[22px]">
        <a-select
          v-model:value="modelRef.region"
          placeholder="请选择项目模版(必选)"
          class="w-[290px] h-[40px]"
        >
          <a-select-option
            :value="items.name"
            v-for="items in DataProject_templatesList"
            :key="items.id"
          ></a-select-option>
        </a-select>
      </div>
      <div class="w-[290px] text-[#606266] mb-[22px]">
        <a-textarea
          class="min-h-[32.6px] w-[100%] border-[#DCDFE6] border rounded-[4px]"
          v-model:value="Textareas"
          placeholder="项目简介"
          allow-clear
        />
      </div>
      <div class="w-[290px] p-[20px] border-t border-gray-300 text-right">
        <button
          @click="BuiltProject"
          class="btn w-[73.5px] h-[39.6px] bg-[#409EFF] border-[#409EFF] text-[#fff] rounded-[4px]"
        >
          <span>确定</span>
        </button>
      </div>
    </a-modal>
    <informationView :showModalImg="showModalImg" @updates="handleUpdateq" />
  </div>
</template>

<script lang="ts" setup>
import type { TabsProps } from "ant-design-vue";
import { message } from "ant-design-vue";
import allProjects from "./components/allProjects.vue";
import messageNotification from "./components/messageNotification.vue";
import informationView from "./components/InformationView.vue";
import {
  project_templatesList,
  newBuiltProjectInformation,
} from "@/service/index";

const { data: DataProject_templatesList } = useRequest(() =>
  project_templatesList({ limit: 1000, offset: 0 }),
);

console.log(DataProject_templatesList);

const router = useRouter();
const route = useRoute();
const isNum = ref(0);
const numIndex = ref(1);
const indexs = ref((index: number) => {
  numIndex.value = index;
  router.push(`/projectManagement/ProjectLists/ProjectList/${index}`);
});
const projectList = ref([
  { ID: 1, Test: "全部项目", Icon: "iconoir:page" },
  { ID: 2, Test: "我的收藏", Icon: "ph:star-light" },
  { ID: 3, Test: "已归档项目", Icon: "bi:briefcase-fill" },
  { ID: 4, Test: "回收站", Icon: "icon-park-outline:delete" },
]);

const activeKey = ref(1);
// console.log(route);
watch([route], () => {
  activeKey.value = Number(
    route.path.replace("/projectManagement/ProjectLists/ProjectList/", ""),
  );
});

const modeTop = ref<TabsProps["tabPosition"]>("top");

// const chooseAAvatar = ref(false);

const modal4Visible = ref<boolean>(false); //新建项目
// const setModal1Visible = ref((open: boolean) => {
//   modal4Visible.value = open;
// });
const showModal = () => {
  modal4Visible.value = !modal4Visible.value;
};
// 创建新项目显示隐藏
const showModalImg = ref(false);

const isshowModalImg = ref(() => {
  showModalImg.value = !showModalImg.value;
});
// 在监听回调中更新父组件的值;
const str = ref<string>("");
const handleUpdateq = (ss: string) => {
  watchEffect(() => {
    str.value = ss;
  });
};

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const onFinish = (values: any) => {
  console.log(values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const modelRef = reactive({
  region: undefined,
});

let Textareas = ref();
const BuiltProject = ref(() => {
  let dataProject = ref({
    cover: str,
    id: "",
    intro: Textareas.value,
    manager_id: 56,
    name: formState.username,
    project_template_id: 17,
  });
  const { data: DataBuiltProjectInformation } = useRequest(
    () => newBuiltProjectInformation(dataProject.value),
    {
      onSuccess() {
        message.success({
          content: () =>
            `${
              DataBuiltProjectInformation.value
                ? DataBuiltProjectInformation.value
                : ""
            }`,
          class: "globalPrompt",
        });
      },
    },
  );
  modal4Visible.value = false;
  str.value = "";
  Textareas.value = "";
  formState.username = "";
  isNum.value++;
});
</script>

<style>
.globalPrompt {
  .ant-message-notice-content {
    width: 320px;
    background: #f0f9eb;
    color: #67c23a;
    font-size: 14px;

    div {
      display: flex;
      align-items: center;
    }
  }
}
:where(.css-dev-only-do-not-override-eq3tly).ant-col-16 {
  max-width: 290px !important;
}
.ant-btn-default {
  display: none;
}
/* .ant-btn-primary {
  background: #409eff !important;
} */

/* .projectList .ant-layout-header {
  display: none;
} */
:where(.css-dev-only-do-not-override-eq3tly).ant-menu-inline.ant-menu-root
  .ant-menu-submenu-title
  > .ant-menu-title-content {
  overflow: none !important;
}

.ant-menu-title-content {
  overflow: none !important;
}
.ant-menu-submenu-title {
  padding-left: 40px !important;
}

.margin_bottom .ant-tabs-nav-list {
  margin-bottom: 15px;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-menu-dark.ant-menu-inline
  .ant-menu-sub.ant-menu-inline {
  background: #fff;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-layout .ant-layout-sider {
  background: #fff;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-menu-dark {
  color: rgba(0, 0, 0, 0.65);
  background: none;
}

.ant-tabs-nav {
  width: 180px;
}
.project
  :where(.css-dev-only-do-not-override-eq3tly).ant-tabs-left
  > .ant-tabs-nav
  .ant-tabs-tab {
  /* padding: 30px 0; */
  padding: 7.9px 45px;
  /* justify-content: left; */
}

.left :where(.css-dev-only-do-not-override-eq3tly).ant-tabs .ant-tabs-ink-bar {
  background: none !important;
}

.ant-tabs-nav {
  width: 100%;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-tabs-left
  > .ant-tabs-content-holder,
:where(.css-dev-only-do-not-override-eq3tly).ant-tabs-left
  > div
  > .ant-tabs-content-holder {
  margin-left: -1px;
  border-color: #fff;
  background: none;
}

.ant-layout-sider ant-layout-sider-dark ant-layout-sider-has-trigger {
  width: 180px;
}
.ant-tabs-nav-operations {
  display: none !important;
}
</style>

<style scoped>
.ant-modal-content {
  width: 330px !important;
  height: 550px;
}
.ant-modal {
  width: 330px !important;
  height: 550px;
}
</style>
