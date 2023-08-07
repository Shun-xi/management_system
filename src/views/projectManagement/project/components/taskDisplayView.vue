<template>
  <div class="flex">
    <!-- 任务暂时 开始 -->
    <div class="flex items-center scrollable-container">
      <div
        class="ml-[4px] px-[3px]"
        v-for="(item, index) in dataGetTaskList?.rows"
        :key="item.id"
      >
        <!-- 标题 开始 -->
        <div
          class="flex items-center justify-between pr-[15px] pb-[20px] text-[#303133] text-[14px] font-semibold"
        >
          <div class="flex items-center">
            {{ item.name }}
            <Icon icon="ic:round-lens" class="text-[5px] mx-[5px]" />
            {{ tasksInTheTaskList[item.id]?.count }}
          </div>
          <a-dropdown
            v-model:open="projectListSettings[index]"
            :trigger="['click']"
            placement="bottom"
            arrow
          >
            <div class="cursor-pointer">
              <Icon icon="ri:more-fill" />
            </div>
            <template #overlay>
              <div
                class="w-[240px] bg-[#ffffff] py-[10px] px-[5px] rounded-[10px] backgroundShadow"
              >
                <!-- 编辑列表 开始 -->
                <div
                  class="flex items-center h-[46px] hover:bg-[#ecf5ff] hover:text-[#66b1ff] text-[14px] px-[20px] cursor-pointer"
                  @click="showModal(item)"
                >
                  <Icon
                    icon="system-uicons:write"
                    class="text-[#606266] text-[20px] mr-[10px]"
                  />
                  编辑列表
                </div>
                <!-- 编辑列表 开始 -->

                <!-- 本列所有任务移至回收站 开始 -->
                <div
                  class="flex items-center h-[46px] hover:bg-[#ecf5ff] hover:text-[#66b1ff] text-[14px] px-[20px] cursor-pointer"
                  @click="
                    deleteList(
                      '移到回收站',
                      '您确定要把列表下的所有任务移到回收站吗?',
                      item.id,
                    )
                  "
                >
                  <Icon
                    class="text-[#606266] text-[20px] mr-[10px]"
                    icon="ep:delete"
                  />
                  本列所有任务移至回收站
                </div>
                <!-- 本列所有任务移至回收站 结束 -->

                <!-- 删除列表 开始 -->
                <div
                  class="flex items-center h-[46px] hover:bg-[#ecf5ff] hover:text-[#66b1ff] text-[14px] px-[20px] cursor-pointer"
                  @click="
                    deleteList(
                      '提示',
                      '删除列表将彻底清空此列表上的所有任务，请确认是否要删除整个列表?',
                      item.id,
                    )
                  "
                >
                  <Icon
                    class="text-[#606266] text-[20px] mr-[10px]"
                    icon="ep:delete"
                  />
                  删除列表
                </div>
                <!-- 删除列表 结束 -->
              </div>
            </template>
          </a-dropdown>
        </div>
        <!-- 标题 结束 -->

        <!-- 内容开始 -->
        <div class="projectHeight scrollable-container">
          <!-- 任务 开始 -->
          <div v-if="tasksInTheTaskList[item.id]?.count !== 0">
            <div
              v-for="key in tasksInTheTaskList[item.id]?.rows"
              :key="key.id"
              @click="taskDetailsT++"
            >
              <div
                v-if="key.is_recycle !== 1"
                class="moveIn w-[270px] min-h-[68px] p-[10px] text-[14px] text-[#303133] bg-white mb-[8px] cursor-pointer overflow-hidden rounded-[4px] flex items-center relative shadow"
              >
                <div
                  class="absolute top-0 left-0 h-[100%] w-[4px]"
                  :class="{
                    'bg-[#1b9aee]': key.task_priority_id === 2,
                    'bg-[#fa8c15]': key.task_priority_id === 4,
                    'bg-[#e62412]': key.task_priority_id === 5,
                    state: key.is_done !== 1,
                  }"
                ></div>
                <input
                  type="checkbox"
                  class="mx-[8px] w-[18px] h-[18px]"
                  :checked="key.is_done === 1 ? true : false"
                  @click="completionStatus()"
                />
                <div class="flex-1">
                  <div
                    class="text-justify whitespace-normal w-[182px] wrapText"
                  >
                    {{ key.name }}
                  </div>
                  <span
                    class="bg-[#e62412] text-[#ffffff] text-[12px] px-[6px] rounded-[2px] whitespace-nowrap"
                    v-if="key.end_date !== ''"
                  >
                    {{ dayjs(key.end_date).format("YYYY年M月D日 HH:mm") }}截止
                  </span>
                  <div class="flex items-center mt-[5px]">
                    <a-tooltip>
                      <template #title>
                        <template v-if="key.task_type_id === 2">任务</template>
                        <template v-if="key.task_type_id === 3">需求</template>
                        <template v-if="key.task_type_id === 4">缺陷</template>
                      </template>
                      <Icon
                        class="text-[18px] mr-[4px]"
                        icon="material-symbols:task"
                        color="#2799ef"
                        v-if="key.task_type_id === 2"
                      />
                      <Icon
                        class="text-[18px] mr-[4px]"
                        icon="material-symbols:box"
                        color="#7070b0"
                        v-if="key.task_type_id === 3"
                      />
                      <Icon
                        class="text-[18px] mr-[4px]"
                        icon="solar:bolt-circle-linear"
                        color="#b23b33"
                        v-if="key.task_type_id === 4"
                      />
                    </a-tooltip>
                    <Icon
                      icon="lucide:file-text"
                      class="text-[#8c8c8c] text-[16px]"
                      v-if="key.remark"
                    />
                  </div>
                </div>
                <a-tooltip>
                  <template #title>
                    {{ key.executor.username }}
                  </template>
                  <img
                    :src="key.executor.avatar"
                    alt=""
                    v-if="key.executor"
                    class="w-[26px] h-[26px] rounded-[50%] absolute right-[10px] top-[10px]"
                  />
                </a-tooltip>
                <a-tooltip class="absolute bottom-[5px] right-[5px]">
                  <template #title>
                    <template v-if="key.task_state_id === 2">待办的</template>
                    <template v-if="key.task_state_id === 3">已确定</template>
                    <template v-if="key.task_state_id === 4">修复中</template>
                    <template v-if="key.task_state_id === 5">已完成</template>
                    <template v-if="key.task_state_id === 6">已验收</template>
                    <template v-if="key.task_state_id === 7">已取消</template>
                  </template>
                  <!-- 待办 -->
                  <Icon
                    class="text-[20px]"
                    icon="clarity:dot-circle-line"
                    color="#ff8118"
                    v-if="key.task_state_id === 2"
                  />

                  <!-- 已确定 -->
                  <Icon
                    class="text-[20px]"
                    icon="material-symbols:timelapse"
                    color="#fcd155"
                    v-if="key.task_state_id === 3"
                  />

                  <!-- 修复中 -->
                  <Icon
                    class="text-[20px]"
                    icon="material-symbols:timelapse"
                    color="#4096e2"
                    v-if="key.task_state_id === 4"
                  />

                  <!-- 已完成 -->
                  <Icon
                    class="text-[20px]"
                    icon="teenyicons:tick-circle-outline"
                    color="#bcbebd"
                    v-if="key.task_state_id === 5"
                  />

                  <!-- 已验收 -->
                  <Icon
                    class="text-[20px]"
                    icon="teenyicons:tick-circle-outline"
                    color="#81b689"
                    v-if="key.task_state_id === 6"
                  />

                  <!-- 已取消 -->
                  <Icon
                    class="text-[20px]"
                    icon="ph:x-circle"
                    color="#d34c64"
                    v-if="key.task_state_id === 7"
                  />
                </a-tooltip>
              </div>
            </div>
          </div>
          <!-- 任务 结束 -->

          <!-- 添加按钮 开始 -->
          <div
            class="h-[30px] flex items-center justify-center rounded-[5px] cursor-pointer bg-[#ffffff] w-[270px]"
            @click.stop="
              () => {
                addTask.map((item, index) => {
                  addTask[index] = false;
                });
                addTask[index] = !addTask[index];
              }
            "
            v-if="!addTask[index]"
          >
            <Icon icon="mingcute:add-fill" class="text-[#8c8c8c]" />
          </div>

          <div
            v-if="addTask[index]"
            class="w-[270px] bg-[#fff] rounded-[4px] p-[10px]"
            style="box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1)"
          >
            <!-- 任务 -->
            <div>
              <a-dropdown
                :trigger="['click']"
                placement="bottomLeft"
                arrow
                v-model:open="taskDropdownList"
              >
                <div
                  class="flex items-center text-[14px] w-[110px] cursor-pointer bg-[#fff]"
                  @click.prevent
                >
                  <div
                    v-if="newTaskStatus === '2'"
                    class="flex items-center w-full flex-1"
                  >
                    <Icon
                      icon="mdi:file"
                      color="#1b9aee"
                      class="text-xl mr-[6px]"
                    />
                    任务
                  </div>
                  <div
                    v-if="newTaskStatus === '3'"
                    class="flex items-center w-full flex-1"
                  >
                    <Icon
                      icon="icon-park-solid:label"
                      color="#6a71b8"
                      class="text-xl mr-[6px]"
                    />
                    需求
                  </div>
                  <div
                    v-if="newTaskStatus === '4'"
                    class="flex items-center w-full flex-1"
                  >
                    <Icon
                      icon="material-symbols:charger-outline"
                      color="#e62412"
                      class="text-xl mr-[6px]"
                    />
                    缺陷
                  </div>
                  <Icon
                    icon="ep:arrow-up-bold"
                    :rotate="2"
                    class="text-[#a1a2a5]"
                  />
                </div>
                <template #overlay>
                  <div
                    class="w-[200px] bg-white"
                    style="
                      padding: 10px 0 !important;
                      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
                      border-radius: 4px !important;
                      margin-left: -10px !important;
                    "
                  >
                    <div
                      class="flex items-center w-full h-[37px] cursor-pointer hover:bg-[#ecf5ff] hover:text-[#66b7ff] relative"
                      style="padding: 0 20px !important"
                      @click="selectTaskType('2')"
                    >
                      <Icon
                        icon="mdi:file"
                        color="#1b9aee"
                        class="text-xl mr-[6px]"
                      />
                      任务
                      <Icon
                        v-if="newTaskStatus === '2'"
                        icon="icon-park-solid:correct"
                        class="absolute top-[50%] right-[10px] translate-x-[-50%] translate-y-[-50%]"
                      />
                    </div>
                    <div
                      class="flex items-center w-full h-[37px] cursor-pointer hover:bg-[#ecf5ff] hover:text-[#66b7ff] relative"
                      style="padding: 0 20px !important"
                      @click="selectTaskType('3')"
                    >
                      <Icon
                        icon="icon-park-solid:label"
                        color="#6a71b8"
                        class="text-xl mr-[6px]"
                      />
                      需求
                      <Icon
                        v-if="newTaskStatus === '3'"
                        icon="icon-park-solid:correct"
                        class="absolute top-[50%] right-[10px] translate-x-[-50%] translate-y-[-50%]"
                      />
                    </div>
                    <div
                      class="flex items-center w-full h-[37px] cursor-pointer hover:bg-[#ecf5ff] hover:text-[#66b7ff] relative"
                      style="padding: 0 20px !important"
                      @click="selectTaskType('4')"
                    >
                      <Icon
                        icon="material-symbols:charger-outline"
                        color="#e62412"
                        class="text-xl mr-[6px]"
                      />
                      缺陷
                      <Icon
                        v-if="newTaskStatus === '4'"
                        icon="icon-park-solid:correct"
                        class="absolute top-[50%] right-[10px] translate-x-[-50%] translate-y-[-50%]"
                      />
                    </div>
                  </div>
                </template>
              </a-dropdown>
            </div>
            <!-- 输入框 -->
            <div class="py-[5px]">
              <a-textarea
                v-model:value="newTaskName"
                class="box-border rounded-[4px]"
                style="
                  min-height: 74.6134px;
                  height: 32px;
                  padding: 5px 15px !important;
                  line-height: 1.5;
                "
                placeholder="输入标题"
              />
            </div>
            <!-- 待认领 -->
            <div class="py-[5px]">
              <a-dropdown
                v-model:open="selectPerformer"
                :trigger="['click']"
                class="h-[40px] my-[6px]"
                placement="top"
                arrow
              >
                <div
                  class="text-[14px] flex items-center cursor-pointer w-[120px]"
                  @click.prevent
                >
                  <div class="flex-1">
                    <div
                      v-if="!unclaimed && performer.length === 0"
                      class="flex items-center w-full cursor-pointer py-[5px] px-[3px] text-[14px] h-[42px] relative"
                    >
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                        class="w-[32px] h-[32px] rounded-[50%] mr-[10px]"
                      />
                      <span class="text-[#606266] flex-1 line-clamp-1"
                        >待认领</span
                      >
                    </div>
                    <!-- 项目成员 -->
                    <div
                      v-for="item in performer"
                      :key="item.id"
                      class="flex items-center w-full cursor-pointer py-[5px] px-[3px] text-[14px] h-[42px] relative"
                      @click="selectPerformerFn(item)"
                    >
                      <img
                        :src="item.avatar"
                        alt=""
                        class="w-[32px] h-[32px] rounded-[50%] mr-[10px]"
                      />
                      <span class="text-[#606266] flex-1 line-clamp-1">{{
                        item.username
                      }}</span>
                    </div>
                  </div>
                  <Icon
                    icon="mdi:question-mark-circle"
                    color="#606266"
                    class="ml-[4px] opacity-[0.5]"
                  />
                </div>
                <!-- 待认领弹窗 -->
                <template #overlay>
                  <div
                    class="w-[240px] bg-white"
                    style="
                      padding: 12px !important;
                      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
                      border-radius: 4px !important;
                      margin-left: -48px !important;
                    "
                  >
                    <!-- 搜索框 -->
                    <div class="w-full relative">
                      <a-input
                        class="h-[36px] pl-[30px] rounded-[4px]"
                        placeholder="搜索"
                        v-model:value="searchForMembers"
                      />
                      <Icon
                        icon="simple-line-icons:magnifier"
                        class="absolute top-[12px] left-[14px]"
                      />
                    </div>
                    <!-- 成员 -->
                    <div
                      style="
                        min-height: 240px;
                        max-height: 500px;
                        overflow-x: hidden;
                        overflow-y: auto;
                      "
                    >
                      <!-- 执行者 -->
                      <p style="line-height: 40px; color: rgba(0, 0, 0, 0.45)">
                        执行者
                      </p>
                      <div>
                        <div
                          v-if="!unclaimed && performer.length === 0"
                          class="flex items-center w-full cursor-pointer py-[5px] px-[3px] text-[14px] h-[42px] relative hover:bg-[#f5f5f5]"
                        >
                          <img
                            src="data:image/png;base64,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"
                            alt=""
                            class="w-[32px] h-[32px] rounded-[50%] mr-[10px]"
                          />
                          <span class="text-[#606266] flex-1 line-clamp-1"
                            >待认领</span
                          >
                          <Icon
                            icon="icon-park-solid:correct"
                            class="absolute top-[50%] right-[10px] translate-x-[-50%] translate-y-[-50%]"
                          />
                        </div>
                        <!-- 项目成员 -->
                        <div
                          v-for="item in performer"
                          :key="item.id"
                          class="flex items-center w-full cursor-pointer py-[5px] px-[3px] text-[14px] h-[42px] relative hover:bg-[#f5f5f5]"
                          @click="selectPerformerFn(item)"
                        >
                          <img
                            :src="item.avatar"
                            alt=""
                            class="w-[32px] h-[32px] rounded-[50%] mr-[10px]"
                          />
                          <span class="text-[#606266] flex-1 line-clamp-1">{{
                            item.username
                          }}</span>
                          <Icon
                            icon="icon-park-solid:correct"
                            class="absolute top-[50%] right-[10px] translate-x-[-50%] translate-y-[-50%]"
                          />
                        </div>
                      </div>
                      <!-- 其他成员 -->
                      <div
                        style="line-height: 40px; color: rgba(0, 0, 0, 0.45)"
                      >
                        其他成员
                      </div>
                      <div
                        class="max-h-[200px] scrollable-container overflow-auto"
                      >
                        <!-- 待领取 -->
                        <div
                          v-if="unclaimed || performer.length !== 0"
                          @click="
                            () => {
                              unclaimed = false;
                              selectPerformer = false;
                              performer = [];
                            }
                          "
                          class="flex items-center w-full cursor-pointer py-[5px] px-[3px] text-[14px] h-[42px] relative hover:bg-[#f5f5f5]"
                        >
                          <img
                            src="data:image/png;base64,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"
                            alt=""
                            class="w-[32px] h-[32px] rounded-[50%] mr-[10px]"
                          />
                          <span class="text-[#606266] flex-1 line-clamp-1"
                            >待认领</span
                          >
                        </div>
                        <!-- 项目成员 -->
                        <div
                          v-for="item in dataProjectCreatorInformation?.rows"
                          :key="item.id"
                          @click="selectPerformerFn(item)"
                        >
                          <!-- performer -->
                          <div
                            v-if="performer[0]?.id !== item.id"
                            class="flex items-center w-full cursor-pointer py-[5px] px-[3px] text-[14px] h-[42px] relative hover:bg-[#f5f5f5]"
                          >
                            <img
                              :src="item.avatar"
                              alt=""
                              class="w-[32px] h-[32px] rounded-[50%] mr-[10px]"
                            />
                            <span class="text-[#606266] flex-1 line-clamp-1">{{
                              item.username
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </a-dropdown>
            </div>
            <!-- 确认取消 -->
            <div>
              <a-button
                type="primary"
                class="w-[49%] h-[40px] rounded-[4px] text-[#606266] bg-[#fff] border-[#DCDFE6] transition"
                @click="
                  () => {
                    addTask[index] = false;
                    searchForMembers = '';
                  }
                "
              >
                取消
              </a-button>
              <a-button
                type="primary"
                class="w-[49%] h-[40px] rounded-[4px] ml-[10px] text-[#fff] bg-[#409EFF] border-[#409EFF]"
                @click="
                  () => {
                    addTask[index] = false;
                    onCreateTask(item);
                  }
                "
              >
                确定
              </a-button>
            </div>
          </div>
          <!-- 添加按钮 结束 -->
        </div>
        <!-- 内容结束 -->
      </div>
    </div>
    <!-- 任务暂时 结束 -->

    <!-- 添加任务 开始 -->
    <a-dropdown
      v-model:open="dropdownMenuDisplayHidden"
      :trigger="['click']"
      placement="bottom"
      arrow
    >
      <span
        class="text-[#888888] hover:text-[#1b9aef] text-[14px] h-[20px] leading-[20px] cursor-pointer"
      >
        <Icon icon="mingcute:add-fill" class="inline-block" />
        新建任务列表
      </span>
      <template #overlay>
        <div
          class="w-[226px] bg-[#ffffff] p-[12px] rounded-[10px] backgroundShadow text-[14px]"
        >
          <div
            class="text-center text-[16px] pb-[10px] border-b border-[#ccc] font-bold"
          >
            新建任务列表
          </div>
          <a-input
            v-model:value="inputValue"
            size="large"
            placeholder="列表名称"
            class="my-[18px]"
          />
          <div>
            <a-button
              type="primary"
              class="bg-[#4096ff] w-[202px] flex items-center justify-center"
              size="large"
              :disabled="inputValue === '' ? true : false"
              @click="createTaskList"
            >
              创建
            </a-button>
          </div>
        </div>
      </template>
    </a-dropdown>
    <!-- 添加任务 结束 -->

    <!-- 编辑任务列表 开始 -->
    <a-modal
      v-model:open="editTaskList"
      title="编辑列表"
      :zIndex="1300"
      :width="360"
    >
      <label for="newName" class="flex items-center justify-center my-[30px]">
        列表名称:
        <a-input
          v-model:value="newName"
          size="large"
          class="w-[190px] ml-[12px]"
          id="newName"
          autocomplete="off"
        />
      </label>
      <template #footer>
        <a-button key="back" @click="showModal()">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          class="bg-[#409eff]"
          @click="confirmModifyingNickname"
          >确定
        </a-button>
      </template>
    </a-modal>
    <!-- 编辑任务列表 结束 -->
  </div>

  <!-- 任务详情 开始 -->
  <taskDetailsView v-if="taskDetailsT % 2 === 0"></taskDetailsView>
  <!-- 任务详情 结束 -->
</template>

<script lang="ts" setup>
import taskDetailsView from "./taskDetailsView.vue";
import {
  getTaskList,
  getAllTasksInTheCurrentTaskList,
  getCreateTaskList,
  modifyTaskListName,
  moveAllTasksInThisColumnToTheRecycleBin,
  getDeleteList,
  getCreateTask,
  projectCreatorInformation,
  modificationCompletionStatus,
} from "@/service/index";
import { Modal, notification } from "ant-design-vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 引入中文语言包
import { createVNode } from "vue";
dayjs.locale("zh-cn"); // 设置使用中文语言包

const taskDetailsT = ref(1);
const route = useRoute();
const addTask = ref<boolean[]>([]); // 添加任务 显示隐藏
const projectListSettings = ref<boolean[]>([]); // 项目列表下拉菜单显示隐藏

const tasksInTheTaskList = ref<{
  // eslint-disable-next-line no-undef
  [x: number]: TgetAllTasksInTheCurrentTaskListData;
}>([]); // 所有任务列表中的任务

// 请求获取所有任务列表
const { data: dataGetTaskList, run: runGetTaskList } = useRequest(
  () =>
    getTaskList({
      project_id: Number(route.params.id),
      prop_order: "sort",
      order: "asc",
    }),
  {
    manual: true,
    onSuccess(data) {
      tasksInTheTaskList.value = [];
      addTask.value = [];
      data?.rows.map((item) => {
        // 获取当前任务列表内所有任务
        getAllTasksInTheCurrentTaskList({
          task_list_id: item.id,
          prop_order: "sort",
          order: "asc",
        }).then((res) => {
          tasksInTheTaskList.value[item.id] = res;
          addTask.value?.push(false);
          projectListSettings.value?.push(false);
        });
      });
    },
  },
);

// 监听route
watch(
  [route],
  () => {
    if (route.path.includes("/projectManagement/project")) {
      runGetTaskList();
    }
  },
  { immediate: true },
);

// 创建任务
const dropdownMenuDisplayHidden = ref<boolean>(false); // 下拉菜单显示隐藏
const inputValue = ref(""); // 创建任务列表
// 请求 创建任务列表
const { run: runCreateTaskList } = useRequest(
  (str) =>
    getCreateTaskList({
      name: str,
      project_id: Number(route.params.id),
    }),
  {
    manual: true,
    onSuccess() {
      runGetTaskList();
    },
  },
);

// 函数 创建任务列表
const createTaskList = () => {
  runCreateTaskList(inputValue.value);
  inputValue.value = "";
  dropdownMenuDisplayHidden.value = false;
};

// 编辑项目列表
const editTaskList = ref(false); // 编辑项目列表名称 弹出框
const newName = ref("");
// eslint-disable-next-line no-undef
const stagingListData = ref<TgetTaskListRowsData | undefined>();

// 函数 切换编辑项目列表名称弹出框 状态
// eslint-disable-next-line no-undef
const showModal = (item?: TgetTaskListRowsData) => {
  editTaskList.value = !editTaskList.value;
  stagingListData.value = item;
  newName.value = item?.name as string;
};

// 请求 修改任务列表名称
const { run: runModifyTaskListName } = useRequest(
  ({ id, name, project_id, currentTime, sort }) =>
    modifyTaskListName({
      id: id,
      name: name,
      project_id: project_id,
      sort: sort,
      created_at: currentTime,
      updated_at: currentTime,
      tasks: [],
      undoneTasks: [],
      doneTasks: [],
      loading: false,
    }),
  {
    manual: true,
    onSuccess(data) {
      notification.success({
        message: data.msg,
      });
      runGetTaskList();
    },
  },
);

// 函数 确认修改昵称
function confirmModifyingNickname() {
  runModifyTaskListName({
    id: stagingListData.value?.id,
    name: newName.value,
    project_id: stagingListData.value?.project_id,
    currentTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    sort: stagingListData.value?.sort,
  });
  editTaskList.value = false;
}

// 请求 本列所有任务移至回收站
const { run: runMoveAllTasksInThisColumnToTheRecycleBin } = useRequest(
  (id) =>
    moveAllTasksInThisColumnToTheRecycleBin({
      task_list_id: id,
    }),
  {
    manual: true,
    onSuccess() {
      runGetTaskList();
    },
  },
);

// 请求 删除列表
const { run: runGetDeleteList } = useRequest(
  (id) =>
    getDeleteList({
      ids: [id],
    }),
  {
    manual: true,
    onSuccess() {
      runGetTaskList();
    },
  },
);

// 本列所有任务移至回收站
function deleteList(
  title: string,
  contentSrc: string,
  // eslint-disable-next-line no-undef
  id: number,
) {
  Modal.confirm({
    title: title,
    content: createVNode("div", {}, contentSrc),
    onOk() {
      if (title === "移到回收站") {
        runMoveAllTasksInThisColumnToTheRecycleBin(id);
      } else {
        runGetDeleteList(id);
      }
    },
    okText: "确定",
    cancelText: "取消",
    class: "deleteFilePopup",
    zIndex: 1600,
    centered: true,
  });
}

// 创建任务
const newTaskName = ref(""); // 任务名称
const newTaskStatus = ref("2"); // 任务类型
const taskDropdownList = ref(false); // 选择任务类型下拉列表
const selectPerformer = ref(false); // 选择执行者下拉列表
const unclaimed = ref(false); // 待领取
// eslint-disable-next-line no-undef
const performer = ref<TprojectCreatorInformationRows[]>([]); // 选择的执行者
const searchForMembers = ref(""); // 搜索成员

// 函数 选择任务类型
function selectTaskType(str: string) {
  newTaskStatus.value = str;
  taskDropdownList.value = false;
}

// 请求 获取项目参与者
const {
  data: dataProjectCreatorInformation,
  run: runProjectCreatorInformation,
} = useRequest((obj) => projectCreatorInformation(obj), { manual: true });

// 监听 是否 搜索成员
watch([searchForMembers], () => {
  runProjectCreatorInformation({
    keyword: searchForMembers.value,
    project_id: route.params.id,
  });
});

// 监听 是否 打开 选择执行者列表
watch([selectPerformer], () => {
  if (selectPerformer.value === true) {
    runProjectCreatorInformation({
      keyword: searchForMembers.value,
      project_id: route.params.id,
    });
  }
});

// 函数 选择执行者
// eslint-disable-next-line no-undef
function selectPerformerFn(item: TprojectCreatorInformationRows) {
  performer.value = [];
  performer.value.push(item);
  selectPerformer.value = false;
}

// 请求 创建任务
const { run: runGetCreateTask } = useRequest(
  ({ name, task_list_id, project_id, task_type_id, executor_id }) =>
    getCreateTask({
      name,
      task_list_id,
      task_type_id,
      task_state_id: 2,
      task_priority_id: 2,
      executor_id,
      project_id,
    }),
  {
    manual: true,
    onSuccess(data) {
      runGetTaskList();
      newTaskName.value = "";
      notification.success({
        message: data.msg,
      });
    },
  },
);

// 创建任务
// eslint-disable-next-line no-undef
function onCreateTask(item: TgetTaskListRowsData) {
  runGetCreateTask({
    name: newTaskName.value,
    task_list_id: item.id,
    project_id: item.project_id,
    task_type_id: newTaskStatus.value,
    executor_id: performer.value[0]?.id ?? 0,
  });
}

// 请求 更改完成状态
const { run: runModificationCompletionStatus } = useRequest(
  (obj) => modificationCompletionStatus(obj),
  {
    manual: true,
  },
);

// 函数 更改完成状态
function completionStatus() {
  console.log();
}
</script>

<style lang="scss" scoped>
.projectHeight {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 185px - 49px);
  width: 284px;
}

/* 阴影 */
.shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

/* 文本换行 */
.wrapText {
  white-space: normal;
  word-break: break-all;
}

.moveIn {
  .state {
    width: 4px;
    transition: all 0.2s;
  }

  &:hover .state {
    width: 8px;
  }
}
</style>
