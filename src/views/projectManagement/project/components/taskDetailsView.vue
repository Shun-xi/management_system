<template>
  <a-modal
    v-model:open="open"
    @ok="handleOk"
    :footer="null"
    width="80%"
    keyboard
    :closable="false"
  >
    <!-- 头部 -->
    <div
      class="flex justify-between items-center border-b border-[#dcdfe6] pb-4"
    >
      <div>
        <a-dropdown
          placement="bottom"
          arrow
          class="bg-[#e1f3fc] flex justify-between items-center text-[#1b9aee] pr-1 pl-1"
        >
          <a-button>
            <Icon icon="ph:file-fill" color="#1b9aee" /><span class="ml-1"
              >任务</span
            ></a-button
          >
          <template #overlay>
            <a-menu>
              <div v-for="(item, index) in icon" :key="index">
                <Icon :icon="item.icon" :color="item.color" />
              </div>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div
        class="flex justify-between items-center pl-[20px] pr-[40px] w-[190px]"
      >
        <a-tooltip>
          <template #title>复制任务链接</template>
          <Icon icon="carbon:link" width="20" />
        </a-tooltip>
        <a-tooltip>
          <template #title>点个赞呗</template>
          <Icon icon="iconamoon:like-light" width="20" />
        </a-tooltip>
        <a-tooltip>
          <template #title>菜单</template>
          <Icon icon="solar:menu-dots-bold" width="20" />
        </a-tooltip>
        <Icon
          icon="material-symbols:close"
          width="20"
          class="hover:text-[#1b9aee]"
          @click="handleCancel"
        />
      </div>
    </div>
    <!-- 头部结束 -->
    <!-- 主体 -->
    <div class="flex justify-between">
      <!-- 左侧 -->
      <div class="w-[60%] task">
        <textarea
          autocomplete="off"
          :placeholder="task_app?.name"
          class="w-[100%] el-textarea__inner hover:bg-[#f5f5f5]"
          style="min-height: 20px"
        >
        </textarea>
        <!-- 完成状态 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="gg:check-r" width="15" color="#8c8c8c" /><span
              class="ml-2 text-[#8c8c8c]"
              >完成状态</span
            >
          </div>
          <div
            class="flex items-center pt-1 pl-1 pr-1 pb-1 rounded-md ss border-[white] border h-[24px]"
          >
            <Icon
              icon="fluent:checkbox-unchecked-16-regular"
              color="#8c8c8c"
              width="15"
            /><span class="ml-2 text-[#8c8c8c]">完成状态</span>
          </div>
        </div>
        <!-- 执行状态 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="raphael:piechart" color="#8c8c8c" width="15" /><span
              class="ml-2 text-[#8c8c8c]"
              >执行状态</span
            >
          </div>
          <div
            class="flex items-center pt-1 pl-1 pr-1 pb-1 rounded-md border border-[white] ss h-[24px]"
          >
            <Icon icon="clarity:dot-circle-line" color="#ff8118" /><span
              class="ml-2 text-[#8c8c8c]"
              >完成状态</span
            >
          </div>
        </div>
        <!-- 执行者 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="prime:user" color="#8c8c8c" width="15" /><span
              class="ml-2 text-[#8c8c8c]"
              >执行者</span
            >
          </div>
          <div class="flex items-center">
            <Icon icon="mdi-light:image" color="#8c8c8c" width="15" /><span
              class="ml-2 text-[#8c8c8c]"
              >待认领</span
            >
            <Icon
              icon="eva:question-mark-circle-fill"
              color="#8c8c8c"
              width="15"
              class="ml-1"
            />
          </div>
        </div>
        <!-- 时间 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="ion:calendar" color="#8c8c8c" width="15" /><span
              class="ml-2 text-[#8c8c8c]"
              >时间</span
            >
          </div>
          <div
            class="flex items-center pt-1 pl-1 pr-1 pb-1 rounded-md hover:border border-[#1b9aee]"
          >
            <a-range-picker show-time>
              <template #renderExtraFooter>extra footer</template>
            </a-range-picker>
          </div>
        </div>
        <!-- 优先级 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="mdi-light:circle" color="#8c8c8c" width="15" /><span
              class="ml-2 text-[#8c8c8c]"
              >优先级</span
            >
          </div>
          <div class="flex items-center pt-1 pl-1 pr-1 pb-1 rounded-md">
            <p
              class="text-[#1b9aee] border border-[#1b9aee] pl-1 pt-1 pr-1 pb-1 rounded-md"
            >
              普通
            </p>
          </div>
        </div>
        <!-- 备注 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="bx:file" color="#8c8c8c" width="15" /><span
              class="ml-2 text-[#8c8c8c]"
              >备注</span
            >
          </div>
          <div class="flex items-center pt-1 pl-1 pr-1 pb-1 rounded-md">
            <span>添加备注</span>
          </div>
        </div>
        <!-- 标签 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="ps:label" color="#8c8c8c" width="10" /><span
              class="ml-2 text-[#8c8c8c]"
              >完成状态</span
            >
          </div>
          <div class="flex items-center pt-1 pl-1 pr-1 pb-1 rounded-md">
            <span class="text-[#1b9aee]">添加标签</span>
          </div>
        </div>
        <!-- 工时 -->
        <div class="task-ding">
          <div class="w-[132px] flex items-center">
            <Icon icon="octicon:clock-24" color="#8c8c8c" width="15" /><span
              class="ml-2 text-[#8c8c8c]"
              >工时</span
            >
            <Icon
              icon="circum:share-1"
              color="#1b9aee"
              width="17"
              class="ml-1"
            />
          </div>
        </div>
        <!-- 添加实际工时 -->
        <button
          class="w-[100%] border mt-5 pt-[13px] pl-[15px] pb-[13px] rounded-xl"
          @click="showModal_time"
        >
          <span class="text-[#1890ff] flex items-center"
            ><Icon
              icon="fluent:add-24-regular"
              color="#1890ff"
              width="15"
            />添加实际工时</span
          >
          <a-modal
            v-model:open_two="open"
            @ok="handleOk"
            :footer="null"
            width="80%"
            keyboard
            :closable="false"
          >
          </a-modal>
        </button>
        <p class="flex items-center mt-5">
          <Icon icon="prime:paperclip" color="#8c8c8c" width="15" />
          <span class="ml-2">关联文件</span>
        </p>
        <!-- 上传文件 -->
        <button
          class="w-[100%] border mt-5 pt-[13px] pl-[15px] pb-[13px] rounded-xl relative"
        >
          <span class="text-[#1890ff] flex items-center"
            ><Icon
              icon="fluent:add-24-regular"
              color="#1890ff"
              width="15"
            />上传文件</span
          >
          <input
            type="file"
            class="w-[100%] h-[100%] absolute top-0 left-0 opacity-0"
          />
        </button>
        <p class="mt-5">true</p>
      </div>
      <!-- 右侧 -->
      <div class="w-[40%] border-l boredr-[#dcdfe6] task relative">
        <!-- 参与者 -->
        <div class="pd">
          <p>参与者:{{ task_apps.count }}</p>
          <div class="mt-2 flex items-center">
            <img
              :src="item.avatar"
              alt=""
              class="w-[30px] h-[30px] rounded-[50%] ml-1"
              v-for="(item, index) in task_apps.rows"
              :key="index"
            />
            <Icon
              icon="zondicons:add-solid"
              color="#1b9aee"
              width="25"
              class="ml-1"
            />
          </div>
        </div>
        <!-- 参与者结束 -->
        <!-- 所有动态 -->
        <div class="task-log border-b">
          <p class="flex items-center">
            所有动态<Icon
              icon="bytesize:chevron-bottom"
              color="#ccc"
              width="15"
              class="ml-2"
            />
          </p>
        </div>
        <!-- 发布评论 -->
        <div class=".task-logs mt-5">
          <textarea
            autocomplete="off"
            placeholder="@ 提及他人，按Ctrl + Enter快速发布"
            class="w-[100%] pl-5 el-textarea__inner"
            style="min-height: 30px"
          ></textarea>
          <div
            class="flex justify-between items-center pl-5 absolute left-0 bottom-0 w-[100%]"
          >
            <Icon icon="la:smile" color="#ccc" width="15" />
            <button class="text-[#1b9aee]">发布</button>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { task, task_name } from "@/service";
import { useRequest } from "vue-request";
const open = ref<boolean>(true);
const loading = ref<boolean>(false);
const open_two = ref<boolean>(false);
const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 2000);
};
const showModal_time = () => {
  open_two.value = true;
};
const task_app: any = ref({});
const task_apps: any = ref({});
// 数据
useRequest(
  () =>
    task({
      id: 1000241,
    }),
  {
    onSuccess: (data) => {
      task_app.value = data;
      console.log(task_app);
    },
  },
);
useRequest(
  () =>
    task_name({
      project_id: 1000422,
    }),
  {
    onSuccess: (data) => {
      task_apps.value = data;
      console.log(task_apps);
    },
  },
);
// 字体图标数组
const icon = [
  { icon: "ph:file-fill", color: "#1b9aee" },
  { icon: "ph:file-fill", color: "black" },
  { icon: "zondicons:add-outline", color: "red" },
];
const handleCancel = () => {
  open.value = false;
};
</script>

<style lang="scss">
.ss:hover {
  border: 1px solid #1b9aee;
}
.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  box-sizing: border-box;
  width: 100%;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 37px;
  min-height: 37px;
  font-size: 18px;
  border: none;
}

.task {
  height: calc(100vh - 170px);
  padding: 10px 10px 0 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.task-ding {
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 5px 0;
}
html body div::-webkit-scrollbar {
  width: 13px px;
  height: 13px;
}
.el-textarea__inner:focus {
  outline: none;
}
.pd {
  padding: 5px 20px 10px 20px;
  border-bottom: 1px solid #e5e5e5;
}
.task-log {
  height: calc(100vh - 390px);
  padding: 20px 0 20px 20px;
}
.task-logs {
  padding: 15px 0;
  border-top: 1px solid #e5e5e5;
}
</style>
