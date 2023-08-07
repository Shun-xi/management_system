<template>
  <div class="h-[calc(100vh - 105px)] overflow-auto padding">
    <div class="bg-[#fff] p-[20px]">
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
          <div class="flex-2 w-[20vw]">时间</div>
          <div class="flex-3 w-[30vw]">操作</div>
        </div>
        <!-- 如果没有数据 -->
        <div
          class="text-[#909399] justify-center flex h-[60px] bottom items-center"
        >
          <div>暂无数据</div>
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
interface FormState {
  username: string;
  nickname: string;
  checkNick: boolean;
}
const formState = reactive<FormState>({
  username: "",
  nickname: "",
  checkNick: false,
});
</script>
<style>
#components-pagination-demo-mini .ant-pagination:not(:last-child) {
  margin-bottom: 24px;
}
</style>
