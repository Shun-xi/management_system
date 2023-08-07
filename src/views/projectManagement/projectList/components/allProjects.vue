<template>
  <div>
    <!-- content -->
    <div
      v-for="item in filteredData"
      :key="item.id"
      class="bottom w-[100%] h-[70px] py-[10px] border-b-1 border-[#e8e8e8] flex"
    >
      <!-- 图片 -->
      <div class="w-[50px] h-[50px] rounded-[3px]">
        <a-image
          :width="50"
          :height="50"
          :preview="false"
          class="w-[50px] h-[50px] object-cover"
          :src="'http://192.168.122.36:1024' + item?.cover"
          fallback="data:image/png;base64,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"
        />
      </div>
      <!-- 图片结束 -->
      <!-- 项目名称介绍 -->
      <div class="flex ml-[10px] w-[36vw] flex-col">
        <!-- top -->
        <div>
          <span
            class="text-[#1890ff] cursor-pointer text-[14px]"
            @click="routeJump(item.id)"
            >{{ item.name }}</span
          ><span
            v-if="item.is_private == 0"
            class="py-[8px] bg-[#f0f9eb] text-[#67c23a] h-[32px] px-[10px] border-[1px] border-[#e1f3d8] text-[12px]"
            style="margin-left: 10px"
            >公开</span
          >
        </div>
        <div class="leading-[25px] mt-[5px]">
          <p class="txt">{{ item.intro }}</p>
        </div>
      </div>
      <!-- 项目名称结束 -->
      <!-- 创建日期 -->
      <div class="txt w-[150px] flex flex-col">
        <div class="h-[25px]">创建日期</div>
        <div class="h-[25px]">{{ item.created_at.slice(0, 10) }}</div>
      </div>
      <!-- 创建日期结束 -->
      <!-- 创建人 -->
      <div class="txt w-[150px] flex flex-col">
        <div class="h-[25px]">创建人</div>
        <div class="h-[25px]">{{ item.creator.username }}</div>
      </div>
      <!-- 创建人结束 -->
      <!-- 进度条 -->
      <div class="w-[200px] flex flex-col">
        <div class="h-[25px] txt">进度</div>
        <div class="h-[25px]">
          <a-row class="w-[200px]">
            <a-col class="w-[150px]">
              <a-slider
                :dots="false"
                :tooltipOpen="false"
                v-model:value="item.progress"
                :min="0"
                :max="100"
                :step="1"
                class="w-[150px]"
              />
            </a-col>
            <a-col class="w-[50px] text-center leading-[25px]">
              <div>{{ Math.round(item.progress) + "%" }}</div>
            </a-col>
          </a-row>
        </div>
      </div>
      <!-- 进度条结束 -->
      <!-- 创建人 -->
      <div
        v-if="routeNum === 1 || routeNum === 2"
        class="txt w-[160px] flex items-center"
      >
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">项目成员</p>
          </template>
          <div
            class="p-[7px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <svg
              class="w-[14px] h-[14px] text-[#606266]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047a9.005 9.005 0 0 1 5.9 8.181a.75.75 0 1 1-1.499.044a7.5 7.5 0 0 0-14.993 0a.75.75 0 0 1-1.5-.045a9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0a4 4 0 0 0-8 0Z"
              />
            </svg>

            <!-- <Icon icon="octicon:person-24" class="text-[12px] text-[#606266]" /> -->
          </div>
        </a-tooltip>
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">项目设置</p>
          </template>
          <div
            @click="toggle(item.id)"
            class="p-[7px] rounded-[50%] ml-[10px] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <svg
              class="w-[12px] h-[12px] ml-[0px] text-[#606266]"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="4"
              >
                <path
                  d="M18.284 43.171a19.995 19.995 0 0 1-8.696-5.304a6 6 0 0 0-5.182-9.838A20.09 20.09 0 0 1 4 24c0-2.09.32-4.106.916-6H5a6 6 0 0 0 5.385-8.65a19.968 19.968 0 0 1 8.267-4.627A6 6 0 0 0 24 8a6 6 0 0 0 5.348-3.277a19.968 19.968 0 0 1 8.267 4.627A6 6 0 0 0 43.084 18A19.99 19.99 0 0 1 44 24c0 1.38-.14 2.728-.406 4.03a6 6 0 0 0-5.182 9.838a19.995 19.995 0 0 1-8.696 5.303a6.003 6.003 0 0 0-11.432 0Z"
                />
                <path d="M24 31a7 7 0 1 0 0-14a7 7 0 0 0 0 14Z" />
              </g>
            </svg>
          </div>
        </a-tooltip>

        <a-tooltip class="cursor-pointer">
          <template #title
            ><p v-if="item.collector.length == 0" class="text-[12px]">
              加入收藏
            </p>
            <p v-else class="text-[12px]">取消收藏</p></template
          >
          <div
            @click="isCollection(item.id)"
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <div v-if="item.collector.length == 0">
              <svg
                class="w-[12px] h-[12px] text-[#606266]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873L12 2Z"
                />
              </svg>
            </div>

            <Icon
              v-else
              icon="tabler:star-filled"
              color="#ffaf38"
              class="text-[12px]"
            />
          </div>
        </a-tooltip>
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">移入回收站</p>
          </template>
          <div
            @click="deleteProject(item)"
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="icon-park-outline:delete"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
      </div>
      <div
        v-if="routeNum == 3"
        class="txt w-[160px] flex items-center justify-end"
      >
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">从归档中恢复项目</p>
          </template>
          <div
            class="p-[7px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="eva:refresh-outline"
              :horizontalFlip="true"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">移入回收站</p>
          </template>
          <div
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="icon-park-outline:delete"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
      </div>
      <div
        v-if="routeNum == 4"
        class="txt w-[160px] flex items-center justify-end"
      >
        <a-tooltip class="cursor-pointer">
          <template #title>
            <p class="text-[12px]">移入回收站</p>
          </template>
          <div
            class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
          >
            <Icon
              icon="icon-park-outline:delete"
              class="text-[12px] text-[#606266]"
            />
          </div>
        </a-tooltip>
      </div>
      <!-- 创建人结束 -->
    </div>
    <a-pagination
      class="relative left-[40%] mt-[15px]"
      v-model:current="current"
      :total="ProjectsList?.length"
      :hideOnSinglePage="true"
      show-less-items
    />
    <div>
      <a-modal
        v-model:open="isopen"
        title="温馨提示"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
      >
        <div class="flex mt-[20px]">
          <svg
            class="text-[#E6A23C] mr-[5px]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
              />
              <path
                fill="currentColor"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 13a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm0-9a1 1 0 0 0-.993.883L11 7v6a1 1 0 0 0 1.993.117L13 13V7a1 1 0 0 0-1-1Z"
              />
            </g>
          </svg>
          <p>你确定要将当前项移至回收站吗</p>
        </div>
        <template #footer>
          <div class="flex">
            <a-button
              @click="isShowOpen"
              okText="取消"
              class="ml-[320px] mt-[0px] w-[55.5px] text-[12px] h-[30px] bg-[#fff] text-[#606266] border-[#DCDFE6]"
              >取消</a-button
            >
            <a-button
              @click="handleOk"
              okText="确定"
              class="ml-[10px] mt-[0px] w-[55.5px] text-[12px] h-[30px] bg-[#409EFF] text-[#FFF] border-[#409EFF]"
              >确定</a-button
            >
          </div>
        </template>
      </a-modal>
    </div>
    <projectSettings
      :open="open"
      @update="handleUpdate"
      :currentData="currentData"
    />
  </div>
</template>

<script lang="ts" setup>
let routeNum = ref(1);
const route = useRoute();
const router = useRouter();

import {
  featProjectsList,
  feat_project_collects,
  DeleteProjectList,
  featUser_info,
} from "@/service/index";

const arrAxios = [
  { collection: 0, is_recycle: 0 },
  { collection: 1, is_recycle: 0 },
  { collection: 0, is_archived: 1 },
  { collection: 0, is_recycle: 1 },
];

// 请求全部项目数据
watch([route], () => {
  // console.log(route.path);
  routeNum.value = Number(
    route.path.replace("/projectManagement/ProjectLists/ProjectList/", ""),
  );
  // console.log(routeNum.value);

  runFeatProjectsList();
  runFeatProjectsList();
});
const { data: ProjectsList, run: runFeatProjectsList } = useRequest(
  () =>
    featProjectsList(
      arrAxios[
        Number(
          route.path.replace(
            "/projectManagement/ProjectLists/ProjectList/",
            "",
          ),
        ) - 1
      ],
    ),
  {
    manual: true,
  },
);
// 点击收藏
const Collection_ID = ref(0);

// 请求 收藏
const { run: runFeat_Project_Collects } = useRequest(
  () => feat_project_collects({ project_id: Collection_ID.value, user_id: 56 }),
  {
    manual: true,
  },
);

const isCollection = ref((index: number) => {
  Collection_ID.value = index;
  runFeat_Project_Collects();
  runFeatProjectsList();
  runFeatProjectsList();
});
runFeatProjectsList();

const current = ref(1);
const filteredData = computed(() => {
  const startIndex = (current.value - 1) * 10;
  const endIndex = startIndex + 10;
  const reversedData = ProjectsList.value?.slice().reverse();
  return reversedData?.slice(startIndex, endIndex);
});
const open = ref(false);
// 在监听回调中更新父组件的值
const handleUpdate = (isopen: boolean) => {
  open.value = isopen;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let currentData: any;
const toggle = ref((index: number) => {
  open.value = !open.value;
  if (ProjectsList.value) {
    for (let i = 0; i < ProjectsList.value?.length; i++) {
      if (ProjectsList.value[i].id == index) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-undef
        currentData = ProjectsList.value[i];
      }
    }
  }
  // console.log(currentData.value);
});

// 请求 个人信息
const { data: DataFeatUser } = useRequest(() => featUser_info());

const routeJump = ref((id: number) => {
  router.push(`/projectManagement/Project/${id}`);
});

let NowData: any;
const deleteProject = ref((item: unknown) => {
  isopen.value = true;
  NowData = item;
  console.log(NowData.creator.id);
});

const isopen = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const handleOk = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    isopen.value = false;
    confirmLoading.value = false;
    NowData.is_recycle = 1;
    if (DataFeatUser.value) {
      if (DataFeatUser.value.id == NowData.creator.id) {
        const { data: DateDeleteProjectList } = useRequest(() =>
          DeleteProjectList(NowData),
        );
        console.log(DateDeleteProjectList);

        runFeatProjectsList();
        runFeatProjectsList();
      } else {
        const { data: DateDeleteProjectList } = useRequest(() =>
          DeleteProjectList(NowData),
        );
        console.log(DateDeleteProjectList);
        router.push("/401_4");
      }
    }
  }, 500);
};
const isShowOpen = () => {
  isopen.value = false;
};
</script>
<style>
.txt {
  color: rgba(0, 0, 0, 0.45);
}
:where(.css-dev-only-do-not-override-eq3tly).ant-slider
  .ant-slider-handle::after {
  content: none;
  width: 0;
  height: 0;
  box-shadow: 0 0 0 0;
}
.bottom {
  border-bottom: 1px solid #e8e8e8;
}
.bottom :where(.css-dev-only-do-not-override-eq3tly).ant-image .ant-image-img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
