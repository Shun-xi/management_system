<template>
  <a-dropdown
    v-model:open="dropdownMenuDisplayHidden"
    :trigger="['click']"
    placement="bottom"
    arrow
  >
    <div class="cursor-pointer text-[14px] text-[#5fafff] flex items-center">
      <Icon class="mr-[5px]" icon="simple-line-icons:magnifier" />筛选
    </div>
    <template #overlay>
      <div
        class="w-[310px] bg-[#ffffff] py-[10px] px-[5px] rounded-[10px] backgroundShadow"
      >
        <!-- 标题 开始 -->
        <div class="flex items-center my-[20px] pr-[10px]">
          <div
            class="w-[70px] pr-[10px] text-[14px] text-[#606266] leading-[40px] text-right"
          >
            标题
          </div>
          <a-input
            v-model:value="title"
            size="large"
            placeholder="搜索任务标题"
            class="h-[40px] flex-1"
          />
        </div>
        <!-- 标题 开始 -->

        <div
          class="mb-[20px] pr-[10px] flex items-center"
          v-for="item in selectorParameters"
          :key="item.id"
        >
          <div
            class="w-[70px] pr-[10px] text-[14px] text-[#606266] leading-[40px] text-right"
          >
            {{ item.promptTitle }}
          </div>
          <a-select
            v-model:value="item.value"
            :mode="item.mode"
            size="large"
            :placeholder="item.placeholder"
            :options="item.options"
            style="width: 220px"
            :showArrow="true"
            @change="onChange"
          ></a-select>
        </div>

        <!-- 搜索 重置 开始 -->
        <div class="flex items-center justify-center mb-[20px]">
          <a-button
            size="large"
            type="primary"
            @click="onSubmit"
            class="bg-[#409eff]"
            >搜索</a-button
          >
          <a-button size="large" style="margin-left: 10px">重置</a-button>
        </div>
        <!-- 搜索 重置 结束 -->
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { projectCreatorInformation } from "@/service/index";

// 路由解析
const route = useRoute();
const dropdownMenuDisplayHidden = ref<boolean>(false); // 下拉菜单显示隐藏

// 标题
const title = ref("");

// 所在项目用户
let projectUser = ref<{ value: string }[]>([]);

// 选择器数据类型
interface IselectorParameters {
  id: number;
  promptTitle: string;
  placeholder: string;
  value: Ref<string[]> | Ref<string>;
  mode: "multiple" | "tags" | undefined;
  options: { value: string }[] | Ref<{ value: string }[]>;
}

// 选择器生成数据
const selectorParameters = ref<IselectorParameters[]>([
  {
    id: 10001,
    promptTitle: "执行者",
    placeholder: "请选择",
    value: ref([]),
    mode: "multiple",
    options: projectUser,
  },
  {
    id: 10002,
    promptTitle: "创建者",
    placeholder: "请选择",
    value: ref([]),
    mode: "multiple",
    options: projectUser,
  },
  {
    id: 10003,
    promptTitle: "是否完成",
    placeholder: "请选择",
    value: ref("全部"),
    mode: undefined,
    options: [
      {
        value: "全部",
      },
      {
        value: "是",
      },
      {
        value: "否",
      },
    ],
  },
  {
    id: 10004,
    promptTitle: "优先级",
    placeholder: "请选择",
    value: ref([]),
    mode: "multiple",
    options: [
      {
        value: "普通",
      },
      {
        value: "紧急",
      },
      {
        value: "非常紧急",
      },
    ],
  },
  {
    id: 10005,
    promptTitle: "执行状态",
    placeholder: "请选择",
    value: ref([]),
    mode: "multiple",
    options: [
      {
        value: "待办的",
      },
      {
        value: "已确认",
      },
      {
        value: "修复中",
      },
      {
        value: "已完成",
      },
      {
        value: "已验收",
      },
      {
        value: "已取消",
      },
    ],
  },
]);

// 获取所在用户
function getTheUser<T extends string | string[]>(id: T) {
  // 请求 项目创建者信息
  projectCreatorInformation({ project_id: id }).then((res) => {
    projectUser.value = res.rows.map((item) => {
      const value: { value: string } = {
        value: item.username,
      };
      return value;
    });
  });
}

watch(
  [route],
  () => {
    if (route.path.includes("/projectManagement/project")) {
      getTheUser(route.params.id);
    }
  },
  { immediate: true },
);

const onChange = () => {
  console.log(selectorParameters);
};

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="stylus" scoped></style>
