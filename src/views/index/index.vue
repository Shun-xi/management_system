<template>
  <div class="contentHeight overflow-auto scrollable-container">
    <!-- 横幅开始 -->
    <div
      class="h-[120px] w-[100%] bg-white flex justify-between items-center mb-[20px] px-[30px]"
    >
      <div class="flex items-center">
        <a-image
          :preview="false"
          :width="66"
          :height="66"
          :src="dataInformation?.data.avatar"
          class="rounded-[50%]"
          fallback="data:image/png;base64,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"
        />
        <div class="h-[100%] ml-[20px]">
          <p class="text-[20px] leading-[33px] text-[#404040]">
            {{ getCurrentTimePeriod() }}好，{{
              dataInformation?.data.username
            }}，祝你开心每一天！
          </p>
          <p class="text-[14px] leading-[33px] text-[#8c8c8c]">
            {{ dataInformation?.data.roles[0].name }}
          </p>
        </div>
      </div>
      <div class="text-[14px] text-center text-[#8c8c8c]">
        项目总数
        <div class="text-[30px] mt-[10px] text-center text-[#404040]">
          {{ total }}
        </div>
      </div>
    </div>
    <!-- 横幅结束 -->

    <!-- 项目展示区域 开始 -->
    <div class="flex justify-between items-start">
      <div class="w-[66%] bg-white">
        <div
          class="h-[61px] flex items-center justify-between px-[20px] border-b-[1px] border-[#e8e8e8]"
        >
          <div class="text-[16px] text-[#303133]">进行中的项目</div>
          <div class="text-[#409EFF] text-[14px]">全部项目</div>
        </div>
        <div class="flex flex-wrap min-h-[500px]">
          <div
            v-for="item in dataOngoingProject"
            :key="item.id"
            @click="
              () => {
                router.push(`/projectManagement/project/${item.id}`);
              }
            "
            class="relative w-[25%] h-[100%] p-[10px] border-r-[1px] border-b-[1px] border-[#e8e8e8] overflow-hidden containerShadow"
          >
            <!-- 公开 -->
            <div
              class="z-[200] absolute top-0 right-0 w-[70px] bg-[rgba(87,78,254,0.8)] text-[#fff] pt-[15px] text-[12px] text-center translate-x-1/2 rotate-45"
              style="transform-origin: top center"
            >
              公开
            </div>
            <!-- 图片 -->
            <div class="w-[100%] h-[150px] overflow-hidden">
              <a-image
                style="height: 150px"
                class="object-cover"
                :preview="false"
                :width="287"
                :height="150"
                :src="`http://api.cc0820.top:7001${item.cover}`"
                fallback="data:image/png;base64,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"
                v-if="item.cover.includes('/public/uploads/')"
              />
              <a-image
                style="height: 150px"
                class="object-cover"
                :preview="false"
                :width="287"
                :height="150"
                :src="item.cover"
                fallback="data:image/png;base64,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"
                v-if="item.cover.includes('https://')"
              />
            </div>
            <div class="text-[#404040] line-clamp-1 text-[14px] leading-[24px]">
              {{ item.name }}
            </div>
            <div class="leading-[24px] line-clamp-1 text-[#8c8c8c] text-[14px]">
              {{ item.intro ? item.intro : "暂无介绍" }}
            </div>
            <a-progress
              :percent="item.progress"
              :showInfo="false"
              :size="[288, 2]"
            />
            <div
              class="flex justify-between leading-[20px] pt-[10px] text-[#8c8c8c] text-[14px]"
            >
              <div>{{ item.creator.username }}</div>
              <div>
                {{
                  dayjs(item.updated_at)
                    .subtract(1, "day")
                    .format("M月D日 HH:mm")
                }}
              </div>
            </div>
          </div>
        </div>
        <a-pagination
          class="w-[100%] flex items-center justify-center pb-[20px] mt-[15px]"
          v-model:current="current"
          v-model:page-size="limit"
          :total="total"
        />
      </div>
      <div class="w-[33%] bg-white">
        <div
          class="h-[61px] flex items-center justify-between px-[20px] border-b-[1px] border-[#e8e8e8]"
        >
          <div class="text-[16px] text-[#303133]">
            我的任务 - {{ getDataMyTask?.count }}
          </div>
          <a-select
            ref="select"
            v-model:value="selectorParameters"
            style="width: 120px"
          >
            <a-select-option :value="0">未完成</a-select-option>
            <a-select-option :value="1">已完成</a-select-option>
          </a-select>
        </div>
        <div class="px-[20px]">
          <a-tabs v-model:activeKey="tabKey">
            <a-tab-pane key="executor_ids">
              <template #tab>
                <span class="flex items-center">
                  <Icon icon="lucide:list" class="mr-[5px]" />
                  我执行的
                </span>
              </template>
              <div class="h-[500px] relative">
                <div
                  v-if="getDataMyTask?.count === 0"
                  class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                >
                  <img
                    src="../../assets/images/ZYB/empty.0bf7a80e.png"
                    alt=""
                    class="h-[160px] mx-[auto]"
                  />
                  <div
                    class="text-[#8c8c8c] text-[16px] leading-[40px] text-center pl-[20px]"
                  >
                    空空如也~~
                  </div>
                </div>
                <div
                  v-for="item in getDataMyTask?.rows"
                  :key="item.id"
                  class="flex items-center justify-between h-[49px] border-b border-[#e8e8e8]"
                >
                  <a-tag v-show="item.task_priority_id === 5" color="error"
                    >非常紧急</a-tag
                  >
                  <a-tag v-show="item.task_priority_id === 4" color="warning"
                    >紧急</a-tag
                  >
                  <a-tag v-show="item.task_priority_id === 2" color="processing"
                    >普通</a-tag
                  >
                  <div
                    class="text-[#1b9aee] flex-1 cursor-pointer"
                    @click="
                      () => {
                        router.push(`/projectManagement/project/${item.id}`);
                      }
                    "
                  >
                    {{ item.name }}
                  </div>
                  <div
                    class="text-[#8c8c8c] hover:text-[#1b9aee] text-[14px] cursor-pointer"
                    @click="
                      () => {
                        router.push(`/projectManagement/project/${item.id}`);
                      }
                    "
                  >
                    {{ item.project.name }}
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="participator_id">
              <template #tab>
                <span class="flex items-center">
                  <Icon icon="icon-park-outline:user" class="mr-[5px]" />
                  我参与的
                </span>
              </template>
              <div class="h-[500px] relative">
                <div
                  v-if="getDataMyTask?.count === 0"
                  class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                >
                  <img
                    src="../../assets/images/ZYB/empty.0bf7a80e.png"
                    alt=""
                    class="h-[160px] mx-[auto]"
                  />
                  <div
                    class="text-[#8c8c8c] text-[16px] leading-[40px] text-center pl-[20px]"
                  >
                    空空如也~~
                  </div>
                </div>
                <div
                  v-for="item in getDataMyTask?.rows"
                  :key="item.id"
                  class="flex items-center justify-between h-[49px] border-b border-[#e8e8e8]"
                >
                  <a-tag v-show="item.task_priority_id === 5" color="error"
                    >非常紧急</a-tag
                  >
                  <a-tag v-show="item.task_priority_id === 4" color="warning"
                    >紧急</a-tag
                  >
                  <a-tag v-show="item.task_priority_id === 2" color="processing"
                    >普通</a-tag
                  >
                  <div
                    class="text-[#1b9aee] flex-1 cursor-pointer"
                    @click="
                      () => {
                        router.push(`/projectManagement/project/${item.id}`);
                      }
                    "
                  >
                    {{ item.name }}
                  </div>
                  <div
                    class="text-[#8c8c8c] hover:text-[#1b9aee] text-[14px] cursor-pointer"
                    @click="
                      () => {
                        router.push(`/projectManagement/project/${item.id}`);
                      }
                    "
                  >
                    {{ item.project.name }}
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="creator_id">
              <template #tab>
                <span class="flex items-center">
                  <Icon icon="zondicons:add-outline" class="mr-[5px]" />
                  我创建的
                </span>
              </template>
              <div class="min-h-[500px] relative">
                <div
                  v-if="getDataMyTask?.count === 0"
                  class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                >
                  <img
                    src="../../assets/images/ZYB/empty.0bf7a80e.png"
                    alt=""
                    class="h-[160px] mx-[auto]"
                  />
                  <div
                    class="text-[#8c8c8c] text-[16px] leading-[40px] text-center pl-[20px]"
                  >
                    空空如也~~
                  </div>
                </div>
                <div
                  v-for="item in getDataMyTask?.rows"
                  :key="item.id"
                  class="flex items-center justify-between h-[49px] border-b border-[#e8e8e8]"
                >
                  <a-tag v-show="item.task_priority_id === 5" color="error"
                    >非常紧急</a-tag
                  >
                  <a-tag v-show="item.task_priority_id === 4" color="warning"
                    >紧急</a-tag
                  >
                  <a-tag v-show="item.task_priority_id === 2" color="processing"
                    >普通</a-tag
                  >
                  <div
                    class="text-[#1b9aee] flex-1 cursor-pointer"
                    @click="
                      () => {
                        router.push(`/projectManagement/project/${item.id}`);
                      }
                    "
                  >
                    {{ item.name }}
                  </div>
                  <div
                    class="text-[#8c8c8c] hover:text-[#1b9aee] text-[14px] cursor-pointer"
                    @click="
                      () => {
                        router.push(`/projectManagement/project/${item.id}`);
                      }
                    "
                  >
                    {{ item.project.name }}
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        <a-pagination
          class="w-[100%] flex items-center justify-center pb-[20px] mt-[15px]"
          v-model:current="MyTaskCurrent"
          v-model:page-size="MyTaskLimit"
          :total="getDataMyTask?.count"
          :hideOnSinglePage="true"
        />
      </div>
    </div>
    <!-- 项目展示区域 结束 -->
  </div>
</template>

<script setup lang="ts">
import { userInformation, ongoingProject, myTask } from "@/service/index"; // 导入服务模块
import getCurrentTimePeriod from "@/hooks/useGetCurrentTimePeriod"; // 导入自定义钩子
import usePagination from "@/hooks/usePagination";
import dayjs from "dayjs"; // 导入 Day.js

// 获取路由实例
const router = useRouter();

// 请求 用户信息
const { data: dataInformation } = useRequest(() => userInformation(), {
  onSuccess: () => {
    runMyTask();
  },
});

// 请求 获取进行中的项目
const { data } = useRequest(() =>
  ongoingProject({
    is_recycle: 0,
    is_archived: 0,
  }),
);
const limit = ref(12); // 每一页的数据条数
const { current, total, data: dataOngoingProject } = usePagination(data, limit);
// 分页切换 结束

// 我的任务 开始
let selectorParameters = ref(0); // 任务完成情况
let tabKey = ref("executor_ids"); // 查询方式
const MyTaskCurrent = ref(1); // 当前页码
const MyTaskLimit = ref(10); // 每一页的数据条数

// 请求 我的任务
const { data: getDataMyTask, run: runMyTask } = useRequest(
  () =>
    myTask({
      limit: 10, // 每页条数
      offset: (MyTaskCurrent.value - 1) * 10, // 偏移量
      is_done: selectorParameters.value, // 任务完成情况
      is_recycle: 0,
      [tabKey.value]: dataInformation.value?.data.id, // 查询方式
      // eslint-disable-next-line no-undef
    } as TMyTaskParams),
  {
    manual: true, // 手动触发请求
  },
);

watch([selectorParameters, tabKey], () => {
  MyTaskCurrent.value = 1;
});

watch([selectorParameters, tabKey, MyTaskCurrent], () => {
  runMyTask(); // 监听任务完成情况 和查询方式变化，重新请求数据
});
</script>

<style lang="scss" scoped>
/* 容器阴影 */
.containerShadow:hover {
  box-shadow: 0px 0px 6px #ccc;
  cursor: pointer;
}
</style>
