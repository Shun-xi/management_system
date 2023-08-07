<template>
  <div
    class="h-[calc(100vh - 105px)] overflow-auto p-[25px] w-[83.5vw] bg-[#F4F4F4 ]"
  >
    <div class="bg-[#fff] p-[20px] w-[100%]">
      <a-form class="flex justify-end">
        <a-form-item label="" name="username">
          <a-input
            v-model:value="formState.username"
            class="w-[250px] h-[40px]"
            placeholder="内容"
          />
        </a-form-item>
        <a-space warp class="bg-[#409EFF] rounded-[6px] mb-[24px] ml-[10px]">
          <a-button
            class="w-[80px] h-[40px]"
            type="primary"
            :icon="h(SearchOutlined)"
            >查询</a-button
          >
        </a-space>
      </a-form>
      <!-- 内容 -->
      <div>
        <!-- 头部 -->
        <div class="text-[#606266] flex h-[50px] bottom items-center">
          <div class="flex-5 w-[50vw]">内容</div>
          <div class="flex-2 w-[20vw] flex justify-center">时间</div>
          <div class="flex-3 w-[30vw] flex justify-center">操作</div>
        </div>
        <!-- 如果没有数据 -->
        <div
          v-if="dataMessagesList?.length == 0"
          class="text-[#909399] justify-center flex h-[60px] bottom items-center"
        >
          <div>暂无数据</div>
        </div>
        <div v-if="dataMessagesList?.length != 0">
          <div
            v-for="item in dataMessagesList"
            :key="item.id"
            class="text-[#606266] justify-center flex h-[60px] bottom items-center"
          >
            <div class="flex-5 w-[50vw] flex items-center">
              <img
                :src="item.actor.avatar"
                alt=""
                class="w-[32px] h-[32px] rounded-[50%]"
              />
              <p class="text-[14px] w-[50px] ml-[10px]">
                {{ item.actor.username }}
              </p>
              <p v-html="item.content"></p>
            </div>
            <div class="flex-2 w-[20vw] flex justify-center">
              {{ item.updated_at }}
            </div>
            <div class="flex-3 w-[30vw] flex justify-center">
              <button class="text-[#409EFF]"><span>查看</span></button>
              <button class="ml-[10px] text-[#C0C4CC]">
                <span>已读</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[10px] flex items-center justify-center">
        <div id="components-pagination-demo-mini">
          <a-pagination
            size="small"
            :total="10"
            show-size-changer
            show-quick-jumper
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { h } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { FeatMessagesList, featUser_info } from "@/service/index";
const route = useRoute();
interface FormState {
  username: string;
  nickname: string;
  checkNick: boolean;
}
let dataMessagesList = ref();
const formState = reactive<FormState>({
  username: "",
  nickname: "",
  checkNick: false,
});
// 请求 个人信息
const { data: DataFeatUser } = useRequest(() => featUser_info());

// 请求 私信 mention@我 inform通知 personal私信
watch([route], async () => {
  await FeatMessagesList({
    prop_order: "id",
    order: "desc",
    pageNo: 1,
    pageSize: 10,
    keyword: null,
    type: route.path.replace("/projectManagement/message/", ""),
    receiver_id: DataFeatUser.value?.id,
    limit: 10,
    offset: 0,
  }).then((res) => {
    dataMessagesList.value = res;
  });
});
</script>
<style>
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
.project-name {
  color: #1b9aee;
}
</style>
