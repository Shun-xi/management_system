<template>
  <div class="w-[1076px] flex flex-wrap mx-auto my-0">
    <div
      class="w-[100%] h-[300px] my-[20px] rounded-[8px] bg-[#fff] p-[10px] flex"
    >
      <!--图表1-->
      <div ref="CanvasExecutionStatus" class="flex-1"></div>
      <!--图表2-->
      <div ref="CanvasTaskPriority" class="flex-1"></div>
    </div>
    <div class="flex justify-between w-[100%]">
      <!--列表-->
      <div class="w-[690px] py-[10px] px-[20px] bg-[#fff] rounded-[8px]">
        <!--标题-->
        <div class="leading-[30px] text-[#303133] text-[14px]">项目动态</div>
        <!--列表-->
        <div>
          <a-list
            class="demo-loadmore-list"
            :loading="initLoading"
            item-layout="horizontal"
            :data-source="list"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions>
                  <div>
                    {{ item.updated_at }}
                  </div>
                </template>
                <a-skeleton avatar :title="false" :loading="!item" active>
                  <a-list-item-meta :description="item.task.name">
                    <template #title>
                      <a href="#">{{ item.remark }}</a>
                    </template>
                    <template #avatar>
                      <a-avatar :src="item.operator.avatar" />
                    </template>
                  </a-list-item-meta>
                </a-skeleton>
              </a-list-item>
            </template>
          </a-list>
        </div>
        <!--分页器-->
        <div class="w-[100%] mt-[15px] flex justify-center">
          <a-pagination
            v-model:current="current"
            :total="sunCurrent"
            show-less-items
            hideOnSinglePage
            @change="showSizeChange"
          />
        </div>
      </div>
      <!--总览-->
      <div class="w-[289px] py-[6px] px-[18px] bg-[#fff] rounded-[8px]">
        <div class="flex items-center mb-[15px]">
          <div class="w-[50px] h-[50px] mr-[14px]">
            <img
              :src="`http://192.168.122.36:1024/${ItemData.cover}`"
              class="w-[50px] h-[50px] object-cover rounded-[5px]"
            />
          </div>
          <div>
            <div class="mb-[4px] text-[14px] text-[#303133]">
              {{ ItemData.name }}
            </div>
            <div class="text-[#00000073] text-[12px]">
              {{ ItemData.creator.username }} 于
              {{ ItemData.updated_at.substring(0, 10) }}创建
            </div>
          </div>
        </div>
        <div class="mb-[20px] text-[#00000073]">{{ ItemData.intro }}</div>
        <!--统计-->
        <div>
          <div class="pb-[20px] pt-[10px] text-[#303133] mb-[10px]">
            项目统计
          </div>
          <div class="flex flex-wrap">
            <div
              class="h-[74px] mb-[60px] w-[60px] mr-[24px]"
              v-for="item in statistics"
              :key="item"
            >
              <div class="text-[12px] text-[#303133]">{{ item.name }}</div>
              <div class="text-[32px] leading-[60px] text-[#303133]">
                {{ item.number }}
              </div>
              <div class="mt-[-18px]">
                <a-progress
                  :percent="(Number(item.number) / taskCount) * 100"
                  size="small"
                  :show-info="false"
                  :strokeColor="item.color"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import echarts from "@/hooks/echarts";
import { allItem, overview, OverviewDetails } from "@/service";
const current = ref(1); //当前页数
let sunCurrent = ref(0); //总条数

const initLoading = ref(false); //当卡片内容还在加载中时，可以用 loading 展示一个占位
const list = ref(); //数据源
// 生成 ECharts 的配置选项
const CanvasExecutionStatus = ref<HTMLElement | null>(null);
const CanvasTaskPriority = ref<HTMLElement | null>(null);
let statistics = ref([
  {
    name: "已完成",
    number: 1,
    color: "rgb(158, 217, 121)",
  },
  {
    name: "未完成",
    number: 1,
    color: "rgb(255, 132, 120)",
  },
  {
    name: "已逾期",
    number: "1",
    color: "rgb(255, 132, 120)",
  },
  {
    name: "待认领",
    number: "1",
    color: "rgb(161, 164, 217)",
  },
  {
    name: "今日到期",
    number: "1",
    color: "rgb(204, 204, 204)",
  },
  {
    name: "逾期完成",
    number: "1",
    color: "rgb(255, 132, 120)",
  },
]); //项目统计
let taskCount = ref(); //总任务

let allItemData = ref(); //总数据
let ItemData = ref({
  creator: {},
  name: "",
  updated_at: "",
  cover: "",
  intro: "",
}); //当前数据

//创建图表函数
const createChartOption = (
  title: string,
  data: { [key: string]: number } | null,
  bol: boolean,
  colors: string[],
) => {
  const chartData = data
    ? Object.keys(data).map((key, index) => ({
        value: data[key],
        name: index === 0 ? "普通" : index === 1 ? "紧急" : "非常紧急",
        itemStyle: { color: colors[index] },
      }))
    : [];

  return {
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: bol ? ["30%", "60%"] : "60%",
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: bol ? 2 : 1,
        },
        data: chartData,
      },
    ],
  };
};
const route = useRoute();
console.log(route.params);
async function showSizeChange() {
  const res1 = await OverviewDetails({
    project_id: route.params.id as string,
    limit: "10",
    offset: String(current.value),
    prop_order: "id",
    order: "desc",
  });
  sunCurrent.value = res1.count; //页面总数据
  list.value = res1.rows; //数据
}
onMounted(async () => {
  const res = await overview({ id: route.params.id as string });
  statistics.value[0].number = res.done;
  statistics.value[1].number = res.undone;
  statistics.value[2].number = res.overdue;
  statistics.value[3].number = res.unreceived;
  statistics.value[4].number = res.dueToday;
  statistics.value[5].number = res.completedOverdue;
  taskCount.value = res.taskCount;
  const res2 = await allItem({ limit: "1000" });
  allItemData.value = res2.rows;
  allItemData.value.forEach(
    (obj: {
      id: number;
      cover: string;
      creator: string;
      name: string;
      intro: string;
      updated_at: string;
    }) => {
      if (obj.id === Number(route.params.id)) {
        ItemData.value.cover = obj.cover;
        ItemData.value.creator = obj.creator;
        ItemData.value.name = obj.name;
        ItemData.value.intro = obj.intro;
        ItemData.value.updated_at = obj.updated_at;
      }
    },
  );
  await showSizeChange();
  const executionStatusOption = createChartOption(
    "任务执行状态",
    res.taskPriority,
    false,
    ["#FE861A", "#4A90E2", "#52C058"],
  );
  const taskPriorityOption = createChartOption(
    "任务优先级",
    res.taskState,
    true,
    ["#1DA9FF", "#FE9916", "#EF2512"],
  );
  if (CanvasExecutionStatus.value) {
    let myChart = echarts.init(CanvasExecutionStatus.value);
    myChart.setOption(executionStatusOption);
  }
  if (CanvasTaskPriority.value) {
    let myChart = echarts.init(CanvasTaskPriority.value);
    myChart.setOption(taskPriorityOption);
  }
});
</script>

<style lang="scss">
.ant-pagination-item-active {
  border: none !important;
  background-color: #409eff !important;
  border-radius: 2px;
}
.ant-pagination-item-active a {
  color: white !important;
}
.ant-progress {
  margin-bottom: 0 !important;
  margin-top: -10px !important;
}
.ant-progress-inner,
.ant-progress-outer {
  display: block !important;
}
.ant-progress-bg {
  height: 4px !important;
}
</style>
