<template>
  <div class="flex justify-around h-[100vh] w-[100%] bg-[#f5f5f5]">
    <div class="w-[70%] bg-[white] rounded-lg h-[400px] mt-[10px]">
      <a-radio-group v-model:value="tabPosition" style="margin: 8px">
      </a-radio-group>
      <a-tabs
        v-model:activeKey="activeKey"
        :tab-position="tabPosition"
        animated
      >
        <a-tab-pane key="1" tab="基本设置"><BasicSettings /></a-tab-pane>
        <a-tab-pane key="2" tab="安全设置">安全设置</a-tab-pane>
        <a-tab-pane key="3" tab="用户绑定">用户绑定</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BasicSettings from "./components/BasicSettings.vue";
import { ref } from "vue";
import { TabsProps } from "ant-design-vue/es/tabs";
const tabPosition = ref<TabsProps["tabPosition"]>("left");
const activeKey = ref("1");
</script>
