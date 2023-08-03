<template>
  <a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在！！！">
    <template #extra>
      <a-button type="primary" class="bg-[#1890ff]" @click="jump"
        >返回首页</a-button
      >
    </template>
  </a-result>
</template>

<script lang="ts" setup>
const router = useRouter();

const jump = () => {
  router.push("/index");
};
</script>

<style lang="stylus" scoped></style>
