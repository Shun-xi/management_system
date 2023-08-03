<template>
  <!-- 注册 开始 -->
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="userInfo"
    :rules="rules"
  >
    <!-- 请输入用户名 -->
    <a-form-item name="registerUserName">
      <a-input
        placeholder="请输入用户名"
        class="h-[40px]"
        type="text"
        v-model:value="userInfo.registerUserName"
        allow-clear
      >
        <template #prefix
          ><Icon icon="majesticons:user" class="text-[#c2c7ce]" />
        </template>
      </a-input>
    </a-form-item>
    <!-- 请输入用户名 -->

    <!-- 请输入邮箱 -->
    <a-form-item name="registerMailbox">
      <a-input
        placeholder="请输入邮箱"
        class="h-[40px]"
        type="text"
        v-model:value="userInfo.registerMailbox"
        allow-clear
      >
        <template #prefix
          ><Icon icon="majesticons:mail" class="text-[#c2c7ce]" />
        </template>
      </a-input>
    </a-form-item>
    <!-- 请输入邮箱 -->

    <!-- 验证码 -->
    <a-form-item name="registerVerificationCode">
      <a-input
        class="h-[40px] w-[180px]"
        placeholder="验证码"
        type="text"
        v-model:value="userInfo.registerVerificationCode"
        autocomplete="current-password"
      >
      </a-input>
      <a-button
        class="h-[40px] flex-1 bg-[#ecf5ff] text-[#409EFF] shadow-none border-1 border-[#b3d8ff]"
        type="primary"
        style="margin-left: 10px"
        :disabled="isCountdownRunning"
        @click="onSendVerificationCode"
        >获取验证码
        <span v-show="isCountdownRunning">({{ countdown }})</span>
      </a-button>
    </a-form-item>
    <!-- 验证码 -->

    <!-- 设置密码 -->
    <a-form-item name="registerPassword">
      <a-input-password
        placeholder="设置密码"
        class="h-[40px]"
        type="password"
        v-model:value="userInfo.registerPassword"
        allow-clear
        autocomplete="current-password"
      >
        <template #prefix>
          <Icon
            icon="solar:lock-password-unlocked-bold-duotone"
            class="text-[#c2c7ce]"
          />
        </template>
      </a-input-password>
    </a-form-item>
    <!-- 设置密码 -->

    <!-- 确认密码 -->
    <a-form-item name="registerConfirmPassword">
      <a-input-password
        placeholder="确认密码"
        class="h-[40px]"
        type="password"
        v-model:value="userInfo.registerConfirmPassword"
        allow-clear
        autocomplete="current-password"
      >
        <template #prefix>
          <Icon
            icon="solar:lock-password-bold-duotone"
            class="text-[#c2c7ce]"
          />
        </template>
      </a-input-password>
    </a-form-item>
    <!-- 确认密码 -->

    <!-- 注册按钮 登录按钮 -->
    <div class="flex items-center">
      <a-button
        class="h-[40px] flex-1 bg-[#409eff]"
        type="primary"
        @click="onSubmit"
        >注册</a-button
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
import {
  isUserExists,
  sendVerificationCodes,
  registeredAccount,
} from "@/service";
import useCountdown from "@/hooks/useCountdown";

// 获取路由实例
const router = useRouter();

// 使用倒计时功能函数，并传入初始值 30 秒
const { countdown, isCountdownRunning, startCountdown } = useCountdown(30);

// 在组件卸载前清除计时器
onBeforeUnmount(() => {
  isCountdownRunning.value = true;
  startCountdown();
});

// 注册 数据
const formRef = ref<FormInstance>();
const userInfo = reactive({
  registerUserName: "",
  registerMailbox: "",
  registerVerificationCode: "",
  registerPassword: "",
  registerConfirmPassword: "",
});

// 请求 发送验证码
const { data: isSendSuccess, run: runSendverificationcodes } = useRequest(
  () => sendVerificationCodes({ target: userInfo.registerMailbox, type: 1 }),
  {
    manual: true,
    // 请求成功时
    onSuccess: () => {
      // 弹出提示信息
      if (isSendSuccess.value === 0 && userInfo.registerMailbox !== "") {
        notification.open({
          type: "success",
          message: `验证码已发送至${userInfo.registerMailbox},请注意查收`,
        });
      }
      // 启动倒计时
      startCountdown();
    },
  },
);

// 请求 注册账号
const { run: runRegisteredAccount } = useRequest(
  () =>
    registeredAccount({
      email: userInfo.registerMailbox,
      code: userInfo.registerVerificationCode,
      username: userInfo.registerUserName,
      password: userInfo.registerPassword,
      passwordConfirm: userInfo.registerConfirmPassword,
      avatar: "",
      verification_type: 1,
    }),
  {
    manual: true,
    // 请求成功时
    onSuccess: () => {
      notification.open({
        type: "success",
        message: `账号注册成功`,
      });
      router.push("/index");
    },
  },
);

// 验证用户名的异步函数
let validateregisterUserName = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入用户名");
  }
  // 使用正则表达式检查用户名长度在2到20个字符之间
  const usernameRegex = /^.{2,20}$/;
  if (!usernameRegex.test(value)) {
    return Promise.reject("用户名长度应在2到20个字符之间");
  }

  // 验证用户名是否已存在
  const res = await isUserExists({ username: value });
  if (res === 0) {
    return Promise.reject("用户名已存在");
  }
  // 请求成功，用户名不存在
  return Promise.resolve();
};

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

    // 验证邮箱是否已注册
    const res = await isUserExists({ email: value });
    if (res === 0) {
      return Promise.reject("邮箱已注册");
    }
    // 请求成功，邮箱未注册
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
  } else if (value !== userInfo.registerPassword) {
    return Promise.reject("确认密码与设置密码不同,请重新输入");
  } else {
    return Promise.resolve();
  }
};

// 定义表单规则，包含每个字段的验证规则
const rules: Record<string, Rule[]> = {
  // 用户名
  registerUserName: [
    { required: true, validator: validateregisterUserName, trigger: "blur" },
  ],
  // 邮箱
  registerMailbox: [
    { required: true, validator: validateEmail, trigger: "blur" },
  ],
  // 验证码
  registerVerificationCode: [
    { required: true, validator: validateVerificationCode, trigger: "blur" },
  ],
  // 密码
  registerPassword: [
    { required: true, validator: validatePass, trigger: "blur" },
  ],
  // 确认密码
  registerConfirmPassword: [
    { required: true, validator: validatePass2, trigger: "blur" },
  ],
};

// 点击获取验证码按钮触发的方法
const onSendVerificationCode = async () => {
  if (formRef.value) {
    try {
      // 验证用户名合法性
      await formRef.value.validateFields("registerUserName");
      // 验证邮箱合法性
      await formRef.value.validateFields("registerMailbox");
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
        runRegisteredAccount();
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

// 定义向父组件发送的自定义事件
const emits = defineEmits(["update"]);

// 点击按钮时触发的方法 触发父组件的自定义事件，将新值传递给父组件
const updateParentValue = () => emits("update", "loginView");
</script>

<style lang="scss">
.ant-form-item-control-input-content {
  display: flex;
}

.anticon {
  vertical-align: 0;
}
</style>
