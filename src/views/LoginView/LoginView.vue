<template>
  <div class="w-screen h-screen bg">
    <!-- logo开始 -->
    <div class="flex items-center fixed top-[24px] left-[22px] z-10">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        style="height: 40px"
        class="mr-[5px]"
      >
        <path
          data-v-37dfd6fc=""
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.737a4.263 4.263 0 100-8.526 4.263 4.263 0 000 8.526z"
          fill="#165DFF"
        ></path>
        <path
          data-v-37dfd6fc=""
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.263 7.737H21v4.353l-.013.384h-4.75c.024-.237.026-.41.026-.41V7.737zM11.526 3.013c.207-.01.402-.013.402-.013h4.335v4.737h-4.35s-.202.004-.387.025v-4.75z"
          fill="#165DFF"
        ></path>
        <path fill="#16D2AC" d="M15 3h6v6h-6z"></path>
      </svg>
      <span class="text-[24px] font-bold text-[#303133]">Arco</span>
    </div>
    <!-- logo结束 -->

    <!-- 注册、登录 开始 -->
    <div
      class="fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[320px]"
    >
      <!-- 登录 开始 -->
      <loginView
        v-if="isSwitch === 'loginView'"
        @update="handleUpdate"
      ></loginView>
      <!-- 登录 结束 -->

      <!-- 注册 开始 -->
      <registerView
        v-if="isSwitch === 'registerView'"
        @update="handleUpdate"
      ></registerView>
      <!-- 注册 结束 -->

      <!-- 找回密码 开始-->
      <forgotPasswordView
        v-if="isSwitch === 'forgotPasswordView'"
        @update="handleUpdate"
      ></forgotPasswordView>
      <!-- 找回密码 结束-->
    </div>
    <!-- 注册、登录 结束 -->

    <!-- 底部信息开始 -->
    <div
      class="fixed bottom-0 w-screen flex items-center justify-center h-[48px] text-[#999] text-[16px]"
    >
      <Icon
        icon="ic:baseline-copyright"
        class="text-[#999] text-[20px] mr-[5px]"
      />
      2021 HOPU | 鄂ICP备29218126号-1
    </div>
    <!-- 底部信息结束 -->
  </div>
</template>

<script lang="ts" setup>
// 自动为您完成了组件的配置和导入，并使得在模板中使用组件变得更加简单
import loginView from "./components/loginView.vue";
import registerView from "./components/registerView.vue";
import forgotPasswordView from "./components/forgotPasswordView.vue";

// 切换选项卡
let isSwitch = ref<"loginView" | "registerView" | "forgotPasswordView">(
  "loginView",
);
let toggle = ref(false);

// 在监听回调中更新父组件的值
const handleUpdate = (
  newValue: "loginView" | "registerView" | "forgotPasswordView",
  isBoolean: boolean,
) => {
  isSwitch.value = newValue;
  toggle.value = isBoolean;
};
</script>

<style lang="scss" scoped>
.bg {
  background: #f5f5f5;
  background-image: url(@/assets/images/ZYB/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}
</style>
