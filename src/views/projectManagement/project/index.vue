<template>
  <div class="contentHeight" :key="$route.fullPath">
    <!-- 导航列表 开始 -->
    <div
      class="w-[100%] h-[46px] text-[15px] border-b border-[#d9d9d9] bg-[#fff] flex items-center justify-between"
    >
      <!-- 左 下拉列表 开始 -->
      <navigationListLeftView class="cursor-pointer"></navigationListLeftView>
      <!-- 左 下拉列表 结束 -->

      <!-- 中 导航列表 开始 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        class="titleOptions"
        :style="{ lineHeight: '45px' }"
      >
        <a-menu-item key="1">任务</a-menu-item>
        <a-menu-item key="2">文件</a-menu-item>
        <a-menu-item key="3">概览</a-menu-item>
        <a-menu-item key="4">版本</a-menu-item>
        <a-menu-item key="5">日程</a-menu-item>
      </a-menu>
      <!-- 中 导航列表 结束 -->

      <!-- 右 功能列表 开始 -->
      <div class="flex items-center w-[288px] justify-end">
        <div
          v-if="selectedKeys[0] === '1'"
          class="cursor-pointer text-[14px] text-[#c0c4cc] flex items-center"
        >
          <Icon
            class="mr-[5px]"
            icon="iconoir:kanban-board"
            :rotate="3"
          />看板视图
        </div>
        <span
          class="text-[#c0c4cc] text-[14px] px-[10px]"
          v-if="selectedKeys[0] === '1'"
          >|</span
        >
        <!-- 筛选开始 -->
        <projectFilteringView
          v-if="selectedKeys[0] === '1'"
        ></projectFilteringView>
        <!-- 筛选结束 -->
        <span
          class="text-[#c0c4cc] text-[14px] px-[10px]"
          v-if="selectedKeys[0] === '1'"
          >|</span
        >
        <!-- 邀请新成员 开始 -->
        <inviteNewMembersView></inviteNewMembersView>
        <!-- 邀请新成员 结束 -->
        <span class="text-[#c0c4cc] text-[14px] px-[10px]">|</span>
        <!-- 菜单 开始 -->
        <menuView></menuView>
        <!-- 菜单 结束 -->
      </div>
      <!-- 右 功能列表 结束 -->
    </div>
    <!-- 导航列表 结束 -->

    <!-- 数据列表 开始 -->
    <div class="projectHeight scrollable-container">
      <!-- 任务展示 开始 -->
      <taskDisplayView v-if="selectedKeys[0] === '1'"></taskDisplayView>
      <!-- 任务展示 结束 -->

      <!-- 文件开始 开始 -->
      <fileView v-if="selectedKeys[0] === '2'"></fileView>
      <!-- 文件开始 结束 -->

      <!-- 概览 开始 -->
      <overviewView v-if="selectedKeys[0] === '3'"></overviewView>
      <!-- 概览 结束 -->
    </div>
    <!-- 数据列表 结束 -->
  </div>
</template>

<script lang="ts" setup>
import navigationListLeftView from "./components/navigationListLeftView.vue";
import projectFilteringView from "./components/projectFilteringView.vue";
import inviteNewMembersView from "./components/inviteNewMembersView.vue";
import menuView from "./components/menuView.vue";
import taskDisplayView from "./components/taskDisplayView.vue";
import overviewView from "./components/overviewView.vue";
import fileView from "./components/fileView.vue";

// 导航列表 默认下标
const selectedKeys = ref<string[]>(["1"]);
</script>

<style lang="scss" scoped>
.projectHeight {
  padding: 20px 20px 0 20px;
  overflow: auto;
  white-space: nowrap;
  height: calc(100vh - 160px);
}
</style>
