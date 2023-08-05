<template>
  <a-dropdown
    v-model:open="dropdownMenuDisplayHidden"
    :trigger="['click']"
    :destroyPopupOnHide="true"
    placement="bottomRight"
    arrow
  >
    <div
      class="cursor-pointer text-[14px] text-[#5fafff] flex items-center pr-[20px]"
    >
      <Icon class="mr-[5px]" icon="ph:list-bold" />菜单
    </div>
    <template #overlay>
      <div
        class="w-[256px] bg-[#ffffff] py-[10px] px-[5px] rounded-[10px] backgroundShadow"
      >
        <!-- 项目设置 开始 -->
        <div
          class="h-[40px] flex items-center mx-[12px] px-[10px] text-[#606266] text-[14px] hover:bg-[#eeeeee] cursor-pointer mt-[12px]"
        >
          <div class="w-[28px]">
            <Icon
              class="text-[#606266] text-[20px]"
              icon="ant-design:setting-outlined"
              :rotate="1"
            />
          </div>
          项目设置
        </div>
        <!-- 项目设置 结束 -->

        <!-- 标签 开始 -->
        <div
          class="h-[40px] flex items-center mx-[12px] px-[10px] text-[#606266] text-[14px] hover:bg-[#eeeeee] cursor-pointer"
        >
          <div class="w-[28px]">
            <Icon
              class="text-[#606266] text-[20px]"
              icon="icon-park-solid:label"
            />
          </div>
          标签*
        </div>
        <!-- 标签 结束 -->

        <!-- 查看回收站 开始 -->
        <div
          class="h-[40px] flex items-center mx-[12px] px-[10px] text-[#606266] text-[14px] hover:bg-[#eeeeee] cursor-pointer"
          @click="recycleBinShowModal"
        >
          <div class="w-[28px]">
            <Icon class="text-[#606266] text-[20px]" icon="ep:delete" />
          </div>
          查看回收站
        </div>
        <!-- 查看回收站 结束 -->

        <!-- 复制项目链接 开始 -->
        <div
          id="CopyLink"
          class="h-[40px] flex items-center mx-[12px] px-[10px] text-[#606266] text-[14px] hover:bg-[#eeeeee] cursor-pointer"
          @click="onCopyLink"
        >
          <div class="w-[28px]">
            <Icon
              class="text-[#606266] text-[20px]"
              icon="grommet-icons:document-verified"
            />
          </div>
          复制项目链接
        </div>
        <!-- 复制项目链接 结束 -->

        <!-- 复制项目 开始 -->
        <div
          class="h-[40px] flex items-center mx-[12px] px-[10px] text-[#606266] text-[14px] hover:bg-[#eeeeee] cursor-pointer"
        >
          <div class="w-[28px]">
            <Icon class="text-[#606266] text-[20px]" icon="ep:document-copy" />
          </div>
          复制项目*
        </div>
        <!-- 复制项目 开始 -->

        <!-- 保存为项目模板 开始 -->
        <div
          class="h-[40px] flex items-center mx-[12px] px-[10px] text-[#606266] text-[14px] hover:bg-[#eeeeee] cursor-pointer mb-[12px]"
        >
          <div class="w-[28px]">
            <Icon
              class="text-[#606266] text-[20px]"
              icon="iconamoon:folder-add"
            />
          </div>
          保存为项目模板*
        </div>
        <!-- 保存为项目模板 结束 -->
      </div>
    </template>
  </a-dropdown>

  <!-- 回收站 弹出框 开始 -->
  <a-modal
    v-model:open="recycleBinOpen"
    title="查看回收站"
    width="768px"
    class="customizeDialogBoxStyles"
    :destroyOnClose="true"
    :zIndex="1500"
  >
    <div class="pt-[22px] pb-[10px] pl-[20px]">
      <a-tabs v-model:activeKey="activeKey" tab-position="left" animated>
        <a-tab-pane key="1">
          <template #tab>
            <span class="flex items-center">
              <Icon icon="grommet-icons:checkbox-selected" class="mr-[5px]" />
              任务
            </span>
          </template>
          <div
            class="min-h-[360px] relative max-h-[600px] overflow-auto scrollable-container pr-[10px]"
          >
            <div v-if="dataRecycleBinTasks?.count !== 0">
              <div
                class="flex justify-between items-center border-b border-[#e8e8e8] py-[10px] h-[70px] text-[14px] text-[#606266]"
                v-for="item in dataRecycleBinTasks?.rows"
                :key="item.id"
              >
                <div class="flex-1 line-clamp-1 flex items-center">
                  <span class="flex-1 max-w-[20%]">{{ item.name }}</span>
                  <button
                    disabled
                    v-if="item.is_done === 1"
                    class="cursor-no-drop bg-[#f0f9eb] text-[#67c23a] border-[1px] border-[#e1f3d8] h-[32px] text-[12px] rounded-[4px] leading-[30px] text-center px-[10px]"
                  >
                    已完成
                  </button>
                  <button
                    disabled
                    v-else
                    class="cursor-no-drop bg-[#f4f4f5] text-[#909399] border-[1px] border-[#e9e9eb] h-[32px] text-[12px] rounded-[4px] leading-[30px] text-center px-[10px]"
                  >
                    未完成
                  </button>
                </div>
                <div class="flex items-center pr-[10px]">
                  <Icon
                    class="text-[14px] cursor-pointer"
                    icon="formkit:refresh"
                    @click="
                      onDataRecovery(
                        item,
                        '确定恢复内容?',
                        '恢复后可在任务列表中查看',
                      )
                    "
                  />
                  <span class="text-[#c0c4cc] text-[14px] px-[10px]">|</span>
                  <Icon
                    class="text-[14px] cursor-pointer"
                    icon="ep:delete"
                    @click="
                      onCompletelyDelete(
                        item.id,
                        '确定彻底删除任务',
                        '彻底删除任务后,该任务将会被永久被删除。',
                      )
                    "
                  />
                </div>
              </div>
            </div>
            <a-empty
              v-else
              class="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
              <template #description>
                <span> 空空如也... </span>
              </template>
            </a-empty>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span class="flex items-center">
              <Icon icon="mdi:paperclip" :rotate="3" class="mr-[5px]" />
              文件
            </span>
          </template>
          <div
            class="min-h-[360px] relative max-h-[600px] overflow-auto scrollable-container pr-[10px]"
          >
            <div v-if="dataRecycleBinFiles?.count !== 0">
              <div
                class="flex justify-between items-center border-b border-[#e8e8e8] py-[10px] h-[70px] text-[14px] text-[#606266]"
                v-for="item in dataRecycleBinFiles?.rows"
                :key="item.id"
              >
                <div class="flex-1 line-clamp-1">{{ item.filename }}</div>
                <div class="flex items-center pr-[10px]">
                  <Icon
                    class="text-[14px] cursor-pointer"
                    icon="formkit:refresh"
                    @click="
                      onDataRecovery(item, '恢复文件', '您确定要恢复文件吗?')
                    "
                  />
                  <span class="text-[#c0c4cc] text-[14px] px-[10px]">|</span>
                  <Icon
                    class="text-[14px] cursor-pointer"
                    icon="ep:delete"
                    @click="
                      onCompletelyDelete(
                        item.id,
                        '删除文件',
                        '您确定要永久删除文件吗?',
                      )
                    "
                  />
                </div>
              </div>
            </div>
            <a-empty
              v-else
              class="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            >
              <template #description>
                <span> 空空如也... </span>
              </template>
            </a-empty>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <template #footer></template>
  </a-modal>
  <!-- 回收站 弹出框 结束 -->
</template>

<script lang="ts" setup>
import { Modal, notification } from "ant-design-vue";
import ClipboardJS from "clipboard";
import {
  recycleBinTasks,
  recycleBinFiles,
  permanentlyDeleteFiles,
  permanentlyDeleteTasks,
  restoreFiles,
  restoreTask,
} from "@/service/index";
import { createVNode } from "vue";

// 路由解析
const route = useRoute();

const dropdownMenuDisplayHidden = ref<boolean>(false); // 下拉菜单显示隐藏

// 查看回收站
const recycleBinOpen = ref<boolean>(false); // 弹出框状态

// 函数 切换 弹出框状态
const recycleBinShowModal = () => {
  recycleBinOpen.value = true;
};

// 标签页的key
const activeKey = ref("1");

// 请求 回收站 任务数据列表
const { data: dataRecycleBinTasks, run: runRecycleBinTasks } = useRequest(
  () => recycleBinTasks({ project_id: Number(route.params.id), is_recycle: 1 }),
  {
    manual: true,
  },
);
// 请求 回收站 文件数据列表
const { data: dataRecycleBinFiles, run: runRecycleBinFiles } = useRequest(
  () => recycleBinFiles({ project_id: Number(route.params.id), is_recycle: 1 }),
  {
    manual: true,
  },
);
// 请求 永久删除文件
const { run: runPermanentlyDeleteFiles } = useRequest(
  (obj) => permanentlyDeleteFiles(obj),
  {
    manual: true,
    onSuccess() {
      runRecycleBinFiles();
      notification.success({
        message: `成功删除文件`,
      });
    },
  },
);
// 请求 永久删除任务
const { run: runPermanentlyDeleteTasks } = useRequest(
  (obj) => permanentlyDeleteTasks(obj),
  {
    manual: true,
    onSuccess() {
      runRecycleBinTasks();
      notification.success({
        message: `成功删除任务`,
      });
    },
  },
);
// 请求 文件还原
const { run: runRestoreFiles } = useRequest((obj) => restoreFiles(obj), {
  manual: true,
  onSuccess() {
    runRecycleBinFiles();
  },
});
// 请求 任务还原
const { run: runRestoreTask } = useRequest((obj) => restoreTask(obj), {
  manual: true,
  onSuccess() {
    runRecycleBinTasks();
  },
});

// 函数 永久删除
const onCompletelyDelete = (id: number, title: string, contentSrc: string) => {
  Modal.confirm({
    title: title,
    content: createVNode("div", {}, contentSrc),
    onOk() {
      if (title === "删除文件") {
        runPermanentlyDeleteFiles({ ids: [id] });
      } else {
        runPermanentlyDeleteTasks({ ids: [id] });
      }
    },
    okText: "确定",
    cancelText: "取消",
    class: "deleteFilePopup",
    zIndex: 1600,
    centered: true,
  });
};

// 函数 还原
const onDataRecovery = (
  // eslint-disable-next-line no-undef
  data: TRecycleBinFilesrows | TRecycleBinTasksRows,
  title: string,
  contentSrc: string,
) => {
  Modal.confirm({
    title: title,
    content: createVNode("div", {}, contentSrc),
    onOk() {
      if (title === "恢复文件") {
        // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
        const { deleted_at, task_id, ...rest } = data as TRecycleBinFilesrows; // 删除 deleted_at 和 task_id 属性
        rest.is_recycle = 0; // 修改 is_recycle 的值为 0
        runRestoreFiles(rest);
      } else {
        // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
        const { executor, ...rest } = data as TRecycleBinTasksRows; // 删除 deleted_at 和 task_id 属性
        rest.is_recycle = 0; // 修改 is_recycle 的值为 0
        runRestoreTask(rest);
      }
    },
    okText: "确定",
    cancelText: "取消",
    class: "deleteFilePopup",
    zIndex: 1600,
    centered: true,
  });
};

// 函数 判断 发送那个请求
function sendRequest() {
  if (activeKey.value === "1") {
    runRecycleBinTasks();
  } else if (activeKey.value === "2") {
    runRecycleBinFiles();
  }
}

// 监听 下拉菜单显示隐藏
watch([recycleBinOpen], () => {
  if (recycleBinOpen.value) {
    sendRequest();
  }
});

// 监听 标签页的key
watch([activeKey], () => {
  sendRequest();
});

// 复制链接
const onCopyLink = () => {
  // 使用 ClipboardJS 将链接复制到剪贴板
  new ClipboardJS("#CopyLink", {
    text: () => window.location.href,
  });
  notification.success({
    message: "复制项目链接成功",
    description: "可粘贴到地址栏中，快速打开此项目",
  });
};
</script>

<style lang="scss">
.deleteFilePopup {
  .ant-btn-primary {
    background: #1677ff !important;
  }
}
</style>
