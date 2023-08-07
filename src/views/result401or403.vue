<template>
  <a-result status="403" title="403">
    <template #extra>
      <div class="flex items-center justify-center flex-wrap">
        <div class="text-left">
          <div class="w-[100%] text-[#1890ff] font-semibold text-[40px]">
            抱歉！
          </div>
          <div
            class="w-[100%] text-[#222222] font-semibold text-[22px] my-[15px]"
          >
            您没有操作权限...
          </div>
          <div class="w-[100%] text-[#585858] mb-[15px]">
            当前帐号没有操作权限,请联系管理员。
          </div>
        </div>
      </div>
      <a-button type="primary" class="bg-[#1890ff]" @click="jump">
        返回首页
      </a-button>
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
