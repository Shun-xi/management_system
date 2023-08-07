<template>
  <div class="songs">
    <div>
      <a-modal
        :style="{ width: '660px', height: '750px', top: '15px' }"
        v-model:open="open"
        title="项目设置"
        @cancel="okcancel"
      >
        <div
          class="w-[610px] h-[610px] pt-[30px] pr-[20px] border-t border-[#dcdfe6]"
        >
          <a-tabs
            class="w-[120px]"
            v-model:activeKey="activeKey"
            tabPosition="left"
          >
            <a-tab-pane :key="item.id" v-for="item in data">
              <template #tab>
                <div class="flex items-center justify-end">
                  <Icon :icon="item.icon" class="mr-[10px]" />
                  {{ item.test }}
                </div>
              </template>
              <!-- 概览 -->
              <div v-if="item.id == 1">
                <h1 class="leading-[28px] mb-[5px]">项目封面</h1>
                <div class="w-[290px] h-[160px]">
                  <img
                    :src="'http://192.168.122.36:1024' + currentData.cover"
                    alt=""
                    class="w-[290px] h-[160px] rounded-[5px]"
                  />
                </div>
                <div class="flex justify-between mt-[20px]">
                  <div>
                    <h1 class="mb-[5px]">
                      <span class="text-[#F56C6C]">*</span> 项目名称
                    </h1>
                    <a-input
                      class="w-[210px] h-[28px]"
                      v-model:value="projectName"
                      :disabled="
                        songProjectsList?.username !=
                        currentData.creator.username
                      "
                      :placeholder="currentData.name"
                    />
                  </div>
                  <div>
                    <h1 class="mb-[5px]">
                      <span class="text-[#F56C6C]">*</span> 项目进度 (%)
                    </h1>
                    <a-input
                      class="w-[210px] h-[28px]"
                      v-model:value="progress"
                      :disabled="true"
                      :placeholder="currentData.progress"
                    />
                  </div>
                </div>
                <div class="mt-[20px]">
                  <h1 class="mb-[5px]">项目简介</h1>
                  <a-textarea
                    class="w-[100%] h-[65px] text-[12px]"
                    v-model:value="intro"
                    :disabled="
                      songProjectsList?.username != currentData.creator.username
                    "
                    :placeholder="
                      currentData.intro == ''
                        ? '介绍一下这个项目'
                        : currentData.intro
                    "
                  />
                </div>
                <div class="mt-[20px]">
                  <h1 class="mb-[5px]">项目公开性</h1>
                  <a-select
                    v-if="
                      songProjectsList?.username != currentData.creator.username
                    "
                    :disabled="true"
                    class="w-[100%] text-[12px]"
                    :placeholder="
                      currentData.is_private == 0
                        ? '公开项目（所有人都可通过链接访问，仅项目成员可编辑）'
                        : '私有项目（仅项目成员可查看和编辑）'
                    "
                  >
                    <a-select-option value="demo" class="text-[12px]"
                      >私有项目（仅项目成员可查看和编辑）</a-select-option
                    >
                    <a-select-option value="demo"
                      >公开项目（所有人都可通过链接访问，仅项目成员可编辑）</a-select-option
                    >
                  </a-select>
                  <a-select
                    v-else
                    @change="onchange"
                    ref="refSelect"
                    :disabled="false"
                    v-model:value="onSelectValue"
                    class="w-[100%] text-[12px]"
                    :placeholder="
                      currentData.is_private == 0
                        ? '公开项目（所有人都可通过链接访问，仅项目成员可编辑）'
                        : '私有项目（仅项目成员可查看和编辑）'
                    "
                  >
                    <a-select-option value="1" class="text-[12px]"
                      >私有项目（仅项目成员可查看和编辑）</a-select-option
                    >
                    <a-select-option value="0"
                      >公开项目（所有人都可通过链接访问，仅项目成员可编辑）</a-select-option
                    >
                  </a-select>
                </div>
                <div class="mt-[20px]">
                  <h1 class="mb-[5px]">项目拥有者</h1>
                  <div class="flex items-center">
                    <div>
                      <img
                        :src="currentData.creator.avatar"
                        alt=""
                        class="w-[40px] h-[40px] rounded-[50%]"
                      />
                    </div>
                    <h1 class="ml-[10px]">
                      {{ currentData.creator.username }}
                    </h1>
                  </div>
                </div>
              </div>
              <!-- 项目偏好 -->
              <div v-if="item.id == 2">
                <div class="flex justify-between">
                  <div class="text-[#606266] text-[14px]">自动更新</div>
                  <a-switch
                    :disabled="true"
                    v-model:checked="checked"
                    class="bg-[#BCBEC2]"
                  />
                </div>
                <div class="mt-[20px] text-[#606266] text-[14px]">
                  根据当前任务的完成情况自动计算项目进度。
                </div>
              </div>
              <!-- 更多 -->
              <div v-if="item.id == 3">
                <div
                  class="text-[#606266] font-[600] text-[16px] leading-[30px]"
                >
                  项目操作
                </div>
                <div
                  class="text-[rgba(0, 0, 0, .45)] text-[14px] leading-[30px]"
                >
                  您可以执行以下操作
                </div>
                <div class="mt-[20px]">
                  <a-button
                    class="w-[98px] h-[40px] bg-[#fde2e2] text-[#f9a7a7]"
                    type="primary"
                    :disabled="
                      songProjectsList?.username != currentData.creator.username
                    "
                    danger
                    @click="showModal"
                    >归档</a-button
                  >
                  <a-button
                    type="primary"
                    class="w-[70px] h-[40px] ml-[10px] bg-[#fde2e2] text-[#f9a7a7]"
                    disabled
                    >退出</a-button
                  >
                  <a-button
                    type="primary"
                    class="first w-[111px] ml-[10px] h-[40px]"
                    :disabled="
                      songProjectsList?.username != currentData.creator.username
                    "
                    >移至回收站</a-button
                  >
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        <template #footer>
          <a-button
            :confirm-loading="confirmLoading"
            @click="handleOk"
            okText="确定"
            :disabled="
              songProjectsList?.username != currentData.creator.username
            "
            class="ml-[515px] mt-[0px] w-[73.5px] h-[40px] bg-[#a0cfff] text-[#FFF] border-[#a0cfff]"
            >确定</a-button
          >
        </template>
      </a-modal>
      <div>
        <a-modal
          class="w-[421px] h-[155px] eject"
          v-model:open="showOpen"
          title="温馨提示"
        >
          <div class="flex mt-[20px]">
            <Icon
              icon="mingcute:warning-fill"
              class="text-[#E6A23C] mr-[10px] text-[25px]"
            />
            <div>你确定要归档此项目吗</div>
          </div>
          <template #footer>
            <div class="flex">
              <a-button
                @click="isShowOpen"
                okText="取消"
                class="ml-[250px] mt-[0px] w-[55.5px] text-[12px] h-[30px] bg-[#fff] text-[#606266] border-[#DCDFE6]"
                >取消</a-button
              >
              <a-button
                @click="Determine"
                okText="确定"
                class="ml-[10px] mt-[0px] w-[55.5px] text-[12px] h-[30px] bg-[#409EFF] text-[#FFF] border-[#409EFF]"
                >确定</a-button
              >
            </div>
          </template>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { featUser_info, ModifyProjectInformation } from "@/service/index";
import { message } from "ant-design-vue";
import { SelectValue } from "ant-design-vue/es/select";
const projectName = ref();
const progress = ref();
const intro = ref();
const onSelectValue = ref();
const is_private = ref(1);
// 请求全部项目数据
const { data: songProjectsList } = useRequest(() => featUser_info());

const checked = ref<boolean>(false);
const data = ref([
  { id: 1, test: "概览", icon: "icon-park-outline:ranking" },
  { id: 2, test: "项目偏好", icon: "ph:eye" },
  { id: 3, test: "更多", icon: "ri:more-fill" },
]);
const activeKey = ref(1);
const confirmLoading = ref<boolean>(false);
const open = ref<boolean>(false);

const isopen = defineProps<{
  open: boolean;
  // eslint-disable-next-line no-undef
  currentData: TsongCurrentData;
}>();

watchEffect(() => {
  open.value = isopen.open;
  if (isopen.currentData != undefined) {
    projectName.value = isopen.currentData.name;
    progress.value = isopen.currentData.progress;
    intro.value = isopen.currentData.intro;
  }
});
const onchange = (value: SelectValue) => {
  is_private.value = Number(value);
};
const emits = defineEmits(["update"]);
const handleOk = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    // 修改数据
    // eslint-disable-next-line no-undef
    if (isopen.currentData != undefined) {
      // eslint-disable-next-line no-undef
      let songCurrentData: TsongCurrentData = isopen.currentData;
      songCurrentData.name = projectName.value;
      songCurrentData.progress = progress.value;
      songCurrentData.intro = intro.value;
      songCurrentData.is_private = is_private.value;
      const { data: datamsg } = useRequest(
        () => ModifyProjectInformation(songCurrentData),
        {
          onSuccess() {
            message.success({
              content: () =>
                `${datamsg?.value != undefined ? datamsg?.value.data.msg : ""}`,
              class: "globalPrompt",
            });
          },
        },
      );
    }
  }, 500);
};
const okcancel = () => {
  emits("update", false);
};
const showOpen = ref<boolean>(false);

const showModal = () => {
  showOpen.value = true;
};

const Determine = () => {
  showOpen.value = false;
  confirmLoading.value = false;
  emits("update", false);
  if (isopen.currentData != undefined) {
    // eslint-disable-next-line no-undef
    let songCurrentData: TsongCurrentData = isopen.currentData;
    songCurrentData.is_archived = 1;

    const { data: datamsg } = useRequest(
      () => ModifyProjectInformation(songCurrentData),
      {
        onSuccess() {
          message.success({
            content: () =>
              `${datamsg?.value != undefined ? datamsg?.value.data.msg : ""}`,
            class: "globalPrompt",
          });
        },
      },
    );
  }
};
const isShowOpen = () => {
  showOpen.value = false;
};
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

.songs .eject .ant-modal-content {
  width: 420px;
  height: 155px;
  top: 100% !important;
}

.songs
  :where(.css-dev-only-do-not-override-eq3tly).ant-btn-default:not(
    :disabled
  ):hover {
  color: none;
}
.songs .ant-modal-content {
  height: 750px;
}
.songs
  :where(.css-dev-only-do-not-override-eq3tly).ant-tabs-left
  > .ant-tabs-content-holder
  > .ant-tabs-content
  > .ant-tabs-tabpane {
  width: 470px;
}
.songs .ant-tabs-tab {
  height: 40px;
  justify-content: right !important;
  padding: 0 20px !important;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-tabs .ant-tabs-content-holder {
  min-width: 460px !important;
}
.songs:where(.css-dev-only-do-not-override-eq3tly).ant-input-disabled,
:where(.css-dev-only-do-not-override-eq3tly).ant-input[disabled] {
  background-color: #f5f7fa !important;
}
.songs
  .ant-select-disabled:where(
    .css-dev-only-do-not-override-eq3tly
  ).ant-select:not(.ant-select-customize-input)
  .ant-select-selector {
  background-color: #f5f7fa !important;
  font-size: 12px;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-modal
  .ant-modal-footer
  .ant-btn
  + .ant-btn:not(.ant-dropdown-trigger) {
  background-color: #1677ff !important;
}
.songs
  :where(.css-dev-only-do-not-override-eq3tly).ant-modal
  .ant-modal-content {
  top: 0px;
}

:where(
    .css-dev-only-do-not-override-eq3tly
  ).ant-btn-primary.ant-btn-dangerous:disabled {
  background-color: #fef0f0;
  color: #f9a7a7;
  border: #fde2e2;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-btn-primary.ant-btn-dangerous {
  background-color: #fef0f0;
  color: #f9a7a7;
  border: #fde2e2;
}
:where(.css-dev-only-do-not-override-eq3tly).ant-btn-primary:disabled {
  background-color: #fef0f0;
  color: #f9a7a7;
  border: #fde2e2;
}
.first {
  color: #fff !important;
  background-color: #f9a7a7 !important;
  border-color: #fab6b6 !important;
}
.ant-btn-default {
  display: block !important;
}

.ant-modal-footer
  :where(.css-dev-only-do-not-override-eq3tly).ant-btn-default:disabled {
  background-color: #a0cfff;
  color: #fff;
  border-color: #a0cfff;
}
</style>
