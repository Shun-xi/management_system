<template>
  <NavigationMenuView></NavigationMenuView>

  <div class="flex project" v-if="isExist">
    <!-- 侧边栏 -->
    <!-- 带有可折叠功能的侧边栏布局 -->
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible class="left">
        <div class="logo" />
        <!-- 垂直菜单，使用暗色主题 -->
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <!-- "项目列表" 子菜单 -->
          <a-sub-menu key="sub1">
            <template #title>
              <!-- "项目列表" 子菜单标题 -->
              <div class="flex items-center ml-[-25px]">
                <Icon icon="mingcute:menu-line" :rotate="2" class="mr-[10px]" />
                <span>项目列表</span>
              </div>
            </template>
            <div class="margin_bottom">
              <!-- 项目列表的选项卡 -->
              <a-tabs
                class="left"
                v-model:activeKey="activeKey"
                :tab-position="modeLeft"
                :style="{ width: '180px' }"
              >
                <!-- 单个项目的选项卡面板 -->
                <a-tab-pane v-for="item in projectList" :key="item.ID">
                  <template #tab>
                    <!-- 每个选项卡的内容 -->
                    <div class="flex items-center" @click="indexs(item.ID)">
                      <!-- 图标和项目名称 -->
                      <Icon :icon="item.Icon" class="mr-[5px]" />
                      {{ item.Test }}
                    </div>
                  </template>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-sub-menu>

          <!-- 另一个选项卡组件用于 "项目模板" -->
          <a-tabs
            v-model:activeKey="activeKey"
            :tab-position="modeLeft"
            :style="{ width: '180px' }"
          >
            <a-tab-pane :key="8">
              <template #tab>
                <div
                  class="flex items-center ml-[-25px]"
                  @click="isProjectTemplate"
                >
                  <Icon icon="ri:booklet-line" :rotate="2" class="mr-[10px]" />
                  项目模板
                </div>
              </template>
            </a-tab-pane>
          </a-tabs>

          <!-- "消息通知" 子菜单 -->
          <a-sub-menu key="sub2">
            <template #title>
              <!-- "消息通知" 子菜单标题 -->
              <div class="flex items-center ml-[-25px]">
                <Icon icon="lucide:bell-ring" class="mr-[10px]" />
                <span class="text-[#303133]">消息通知</span>
              </div>
            </template>
            <!-- 消息通知列表的选项卡 -->
            <a-tabs
              class="left"
              v-model:activeKey="activeKey"
              :tab-position="modeLeft"
              :style="{ width: '180px', overflow: 'none' }"
            >
              <!-- 单个消息通知的选项卡面板 -->
              <a-tab-pane v-for="item in NewsList" :key="item.ID">
                <template #tab>
                  <!-- 每个选项卡的内容 -->
                  <div
                    class="flex items-center"
                    @click="routeNewList(item.route)"
                  >
                    <!-- 图标和通知消息 -->
                    <Icon :icon="item.Icon" class="mr-[5px]" />
                    {{ item.Test }}
                  </div>
                </template>
              </a-tab-pane>
            </a-tabs>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <router-view />
    </a-layout>
  </div>
  <router-view v-else />
</template>

<script lang="ts" setup>
const route = useRoute();

let isExist = ref(false);
watchEffect(() => {
  isExist.value = route.path.includes("projectManagement");
});

import router from "@/router";
import type { TabsProps } from "ant-design-vue";

const modeLeft = ref<TabsProps["tabPosition"]>("left");
const projectList = ref([
  { ID: 1, Test: "全部项目", Icon: "iconoir:page" },
  { ID: 2, Test: "我的收藏", Icon: "ph:star-light" },
  { ID: 3, Test: "已归档项目", Icon: "bi:briefcase-fill" },
  { ID: 4, Test: "回收站", Icon: "icon-park-outline:delete" },
]);

const NewsList = ref([
  { ID: 5, Test: "@我", Icon: "iconoir:page", route: "mention" },
  { ID: 6, Test: "通知", Icon: "ph:star-light", route: "inform" },
  { ID: 7, Test: "私信", Icon: "bi:briefcase-fill", route: "personal" },
]);

const routeNewList = ref((route: string) => {
  router.push(`/projectManagement/message/${route}`);
});

const activeKey = ref(1);

watch([route], () => {
  activeKey.value = Number(
    route.path.replace("/projectManagement/ProjectLists/ProjectList/", ""),
  );
});

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const numIndex = ref(1);
const indexs = ref((index: number) => {
  numIndex.value = index;
  router.push(`/projectManagement/ProjectLists/ProjectList/${index}`);
});
const isProjectTemplate = ref(() => {
  router.push(`/projectManagement/ProjectTemplate`);
});
</script>

<style>
.ant-btn-default {
  display: none;
}
/* .ant-btn-primary {
  background: #409eff !important;
} */

.project .ant-layout-header {
  display: none;
}
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
