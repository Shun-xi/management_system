<template>
  <!-- 注册 开始 -->
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
  >
    <!-- 请输入邮箱 -->
    <a-form-item name="email">
      <a-input
        placeholder="请输入邮箱"
        class="h-[40px]"
        type="text"
        v-model:value="formState.email"
      >
      </a-input>
    </a-form-item>
    <!-- 请输入邮箱 -->

    <!-- 验证码 -->
    <a-form-item name="code">
      <a-input
        class="h-[40px] w-[180px]"
        placeholder="验证码"
        type="text"
        v-model:value="formState.code"
        autocomplete="current-password"
      >
      </a-input>
      <a-button
        class="h-[40px] flex-1 bg-[#409EFF] text-[#FFF] shadow-none border-1 border-[#409EFF]"
        type="primary"
        :disabled="isCountdownRunning"
        style="margin-left: 10px"
        @click="onSendVerificationCode"
        >获取验证码
        <span v-show="isCountdownRunning">({{ countdown }})</span>
      </a-button>
    </a-form-item>
    <!-- 验证码 -->

    <!-- 设置密码 -->
    <a-form-item name="passwords">
      <a-input-password
        placeholder="新密码"
        class="h-[40px]"
        type="password"
        v-model:value="formState.passwords"
        autocomplete="current-password"
      >
      </a-input-password>
    </a-form-item>
    <!-- 设置密码 -->

    <!-- 确认密码 -->
    <a-form-item name="passwordConfirm">
      <a-input-password
        placeholder="确认密码"
        class="h-[40px]"
        type="password"
        v-model:value="formState.passwordConfirm"
        autocomplete="current-password"
      >
      </a-input-password>
    </a-form-item>
    <!-- 确认密码 -->

    <!-- 注册按钮 登录按钮 -->
    <div class="flex items-center">
      <a-button
        class="h-[40px] flex-1 bg-[#409eff]"
        type="primary"
        @click="onSubmit"
        >重置密码</a-button
      >
      <a-button
        class="h-[40px] flex-1 bg-[#ffffff]"
        style="margin-left: 10px"
        @click="
          () => {
            updateParentValue();
            resetForm();
          }
        "
        >去登录</a-button
      >
    </div>
    <!-- 注册按钮 登录按钮 -->
  </a-form>
  <!-- 注册 结束-->
</template>

<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import { notification, type FormInstance } from "ant-design-vue";
import { sendVerificationCodes, resetPassword } from "@/service";
import useCountdown from "@/hooks/useCountdown";

// 定义向父组件发送的自定义事件
const emits = defineEmits(["update"]);

// 点击按钮时触发的方法 触发父组件的自定义事件，将新值传递给父组件
const updateParentValue = () => emits("update", "loginView");

// 使用倒计时功能函数，并传入初始值 30 秒
const { countdown, isCountdownRunning, startCountdown } = useCountdown(30);

// 在组件卸载前清除计时器
onBeforeUnmount(() => {
  isCountdownRunning.value = true;
  startCountdown();
});

// 注册数据
const formRef = ref<FormInstance>();
const formState = reactive({
  email: "",
  code: "",
  passwords: "",
  passwordConfirm: "",
});

// 发送验证码
const { data: isSendSuccess, run: runSendverificationcodes } = useRequest(
  () => sendVerificationCodes({ target: formState.email, type: 1 }),
  {
    manual: true,
    // 请求成功时
    onSuccess: () => {
      // 弹出提示信息
      if (isSendSuccess.value === 0 && formState.email !== "") {
        notification.open({
          type: "success",
          message: `验证码已发送至${formState.email},请注意查收`,
        });
      }
      // 启动倒计时
      startCountdown();
    },
  },
);

// 重置密码
const { run: runResetPassword } = useRequest(
  () =>
    resetPassword({
      email: formState.email,
      code: formState.code,
      password: formState.passwords,
      passwordConfirm: formState.passwordConfirm,
    }),
  {
    manual: true,
    // 请求成功时
    onSuccess: () => {
      notification.open({
        type: "success",
        message: `密码设置成功`,
      });
    },
  },
);

// 验证邮箱的异步函数
let validateEmail = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入邮箱地址");
  } else {
    // 使用正则表达式验证邮箱格式
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|icloud\.com|qq\.com|163\.com|sina\.com|126\.com|aliyun\.com|yeah\.net)$/i;
    if (!emailRegex.test(value)) {
      return Promise.reject("请输入有效的邮箱地址");
    }

    return Promise.resolve();
  }
};
// 验证验证码的异步函数
let validateVerificationCode = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入验证码");
  } else {
    return Promise.resolve();
  }
};
// 验证密码的异步函数
let validatePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入密码");
  }

  // 使用正则表达式检查密码长度在6到15个字符之间
  const passwordRegex = /^.{6,15}$/;
  if (!passwordRegex.test(value)) {
    return Promise.reject("密码长度应在6到15个字符之间");
  }

  // 使用正则表达式验证密码必须是字母和数字的组合
  const passwordCombinationRegex = /^(?=.*\d)(?=.*[a-zA-Z]).*$/;
  if (!passwordCombinationRegex.test(value)) {
    return Promise.reject("密码必须是字母和数字的组合");
  }

  return Promise.resolve();
};
// 验证确认密码是否匹配的异步函数
let validatePass2 = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请再次输入密码");
  } else if (value !== formState.passwords) {
    return Promise.reject("确认密码与设置密码不同,请重新输入");
  } else {
    return Promise.resolve();
  }
};

// 定义表单规则，包含每个字段的验证规则
const rules: Record<string, Rule[]> = {
  // 邮箱
  email: [{ required: true, validator: validateEmail, trigger: "change" }],
  // 验证码
  code: [
    { required: true, validator: validateVerificationCode, trigger: "change" },
  ],
  // 密码
  passwords: [{ required: true, validator: validatePass, trigger: "change" }],
  // 确认密码
  passwordConfirm: [
    { required: true, validator: validatePass2, trigger: "change" },
  ],
};

// 点击获取验证码按钮触发的方法
const onSendVerificationCode = async () => {
  if (formRef.value) {
    try {
      // 验证邮箱合法性
      await formRef.value.validateFields("email");
      // 验证用户名和邮箱的合法性都通过后，触发发送验证码的请求
      runSendverificationcodes();
    } catch (error) {
      console.log("用户名或邮箱验证失败");
    }
  }
};

// 提交表单数据
const onSubmit = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then(() => {
        runResetPassword();
      })
      .catch(() => {
        console.log("error");
      });
  }
};

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};
</script>

<style lang="scss">
.ant-form-item-control-input-content {
  display: flex;
}
</style>
