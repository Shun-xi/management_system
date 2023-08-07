<template>
  <a-layout-header
    class="bg-white flex items-center titleShadow h-[65px] z-[200] relative"
  >
    <div
      class="w-[180px] flex justify-center items-center cursor-pointer"
      @click="router.push('/index')"
    >
      <svg width="36" height="36" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 31.5c11.375 0 19.5-9.035 19.5-19.787H24c0 6.892-5.045 12.284-12 12.284V31.5z"
          fill="#16D2AC"
        ></path>
        <path d="M4.5 4.5H12v19.508H4.5V4.5z" fill="#165DFF"></path>
        <path
          d="M24 4.5v7.503H4.5V4.5H24zM31.5 4.5v7.503H24V4.5h7.5z"
          fill="#165DFF"
        ></path>
      </svg>
      <span class="text-[26px] ml-[6px] text-[#333]"> Arco </span>
    </div>
    <div class="flex items-center justify-between flex-1">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        class="titleOptions"
        :style="{ lineHeight: '65px' }"
      >
        <a-menu-item @click="onMenuItemWorkbench" key="1">
          <svg
            class="mr-[5px]"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6v2H7v2h10v-2h-3v-2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H4V4h16v12z"
            />
          </svg>
          工作台
        </a-menu-item>
        <a-menu-item @click="onMenuItemProject" key="2">
          <svg
            class="mr-[5px]"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M416 896V128h192v768H416zm-288 0V448h192v448H128zm576 0V320h192v576H704z"
            />
          </svg>
          项目</a-menu-item
        >
        <a-menu-item @click="onMenuItemDepartment" key="3">
          <svg
            class="mr-[5px]"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 12 12"
          >
            <path
              fill="currentColor"
              d="M4 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm4.5 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM2.25 7C1.56 7 1 7.56 1 8.25c0 0 0 2.25 3 2.25c2.378 0 2.871-1.414 2.973-2C7 8.347 7 8.25 7 8.25C7 7.56 6.44 7 5.75 7h-3.5Zm5.746 1.6a2.645 2.645 0 0 1-.09.536c-.063.223-.167.49-.342.765a4.1 4.1 0 0 0 .935.099c2.5 0 2.5-1.75 2.5-1.75c0-.69-.56-1.25-1.25-1.25H7.62c.24.358.379.787.379 1.25v.25l-.003.1Z"
            />
          </svg>
          部门</a-menu-item
        >
      </a-menu>
    </div>
    <div class="flex items-center">
      <div class="w-[60px] h-[65px] flex items-center justify-center relative">
        <a-badge
          count="25"
          class="absolute top-[8px] right-0"
          color="#409eff"
        />
        <Icon icon="icon-park-outline:user" class="text-[22px]" />
      </div>
      <a-popover
        placement="bottom"
        class="w-[60px] h-[65px] flex items-center justify-center"
      >
        <template #content>
          <a-tabs v-model:activeKey="activeKey" class="w-[300px]" centered>
            <a-tab-pane key="1" tab="@我" class="min-h-[300px] relative">
              <div
                class="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              >
                <Icon
                  icon="ant-design:message-outlined"
                  class="text-[60px] text-[#a3a3a3] mx-[auto]"
                />
                <div class="text-[#a3a3a3] w-[100%] text-center mt-[16px]">
                  你已查看所有@我
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="通知" class="min-h-[300px] relative">
              <div
                class="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              >
                <Icon
                  icon="mingcute:horn-fill"
                  class="text-[60px] text-[#a3a3a3] mx-[auto]"
                />
                <div class="text-[#a3a3a3] w-[100%] text-center mt-[16px]">
                  你已查看所有通知
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="私信" class="min-h-[300px] relative">
              <div
                class="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              >
                <Icon
                  icon="mdi:email-newsletter"
                  class="text-[60px] text-[#a3a3a3] mx-[auto]"
                />
                <div class="text-[#a3a3a3] w-[100%] text-center mt-[16px]">
                  你已查看所有私信
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </template>
        <div
          class="w-[100%] h-[100%] border-none shadow-none p-0 flex items-center justify-center hover:bg-[#f9f9f9]"
        >
          <Icon icon="icon-park-outline:remind" class="text-[22px]" />
        </div>
      </a-popover>
      <a-popover
        placement="bottom"
        class="w-[144px] h-[65px] flex items-center justify-center pr-[40px] pl-[20px] titleBubbleCard"
      >
        <template #content>
          <div
            class="flex items-center w-[100px] h-[36px] px-[10px] cursor-pointer hover:bg-[#e6f7ff]"
            @click="router.push('/personalCenter/personalCenter')"
          >
            <Icon icon="icon-park-outline:user" class="text-[14px] mr-[5px]" />
            个人设置
          </div>
          <div
            class="flex items-center w-[100px] h-[36px] px-[10px] cursor-pointer hover:bg-[#e6f7ff]"
            @click="showModal"
          >
            <Icon
              icon="carbon:close-filled"
              class="text-[14px] mr-[5px] text-[#f56c71]"
            />
            退出登录
          </div>
        </template>
        <div
          class="w-[100%] h-[100%] border-none shadow-none p-0 flex items-center justify-center hover:bg-[#f9f9f9]"
        >
          <a-image
            :preview="false"
            :width="32"
            :height="32"
            :src="dataInformation?.data.avatar"
            class="rounded-[50%]"
            fallback="data:image/png;base64,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"
          />
          <span
            class="text-[14px] text-[#303133] ml-[8px] line-clamp-1 flex-1"
            >{{ dataInformation?.data.username }}</span
          >
        </div>
      </a-popover>
    </div>
  </a-layout-header>

  <!-- 退出登录 开始 -->
  <a-modal v-model:open="open" title="温馨提示" @ok="handleOk" :centered="true">
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        @click="handleOk"
        class="bg-[#66b1ff]"
        >确定</a-button
      >
    </template>
    <div class="flex items-center mt-[40px]">
      <Icon
        icon="dashicons:warning"
        class="text-[#e6a23c] text-[26px] mr-[10px]"
      />
      您确定要退出Arco吗?
    </div>
  </a-modal>
  <!-- 退出登录 结束 -->
</template>

<script lang="ts" setup>
import { userInformation } from "@/service/index";
import store from "storejs";

// 获取路由实例
const router = useRouter();

// 请求 用户信息
const { data: dataInformation } = useRequest(() => userInformation(), {
  onSuccess: () => {
    store.set("username", dataInformation.value?.data.username);
  },
});

// 跳转
const selectedKeys = ref<string[]>(["1"]);
const onMenuItemWorkbench = function () {
  selectedKeys.value = ["1"];
  router.push("/index");
};

const onMenuItemProject = function () {
  selectedKeys.value = ["2"];
};

const onMenuItemDepartment = function () {
  selectedKeys.value = ["3"];
};

// 接收路由数据
const route = useRoute();

const determineTheCurrentPage = () => {
  if (route.path.includes("index")) {
    selectedKeys.value = ["1"];
  } else if (route.path.includes("projectManagement")) {
    selectedKeys.value = ["2"];
  } else if (route.path.includes("departmentManagement")) {
    selectedKeys.value = ["3"];
  }
};

watch(
  route,
  () => {
    determineTheCurrentPage();
  },
  {
    immediate: true,
  },
);

// 退出登录 弹出框
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

// 成功执行
const handleOk = () => {
  open.value = false;
  store.remove("arco_auth");
  store.remove("routingData");
  router.push("/LoginView");
};

// 失败执行
const handleCancel = () => {
  open.value = false;
};

const activeKey = ref("2");
</script>

<style lang="scss">
.titleShadow {
  box-shadow: 0 0 10px #ccc;
}

.titleOptions {
  li {
    .ant-menu-title-content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
