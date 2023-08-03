import { ref, Ref, watchEffect } from "vue";

// 定义倒计时功能函数的返回值类型
interface CountdownResult {
  countdown: Ref<number>;
  isCountdownRunning: Ref<boolean>;
  startCountdown: () => void;
}

// 定义倒计时功能函数
const useCountdown = (initialValue = 60): CountdownResult => {
  // 定义倒计时的初始值（秒数）
  const initialCountdown = initialValue;

  // 定义一个 ref 来保存倒计时的值
  const countdown: Ref<number> = ref(initialCountdown);

  // 定义一个 ref 来保存倒计时是否在运行的状态
  const isCountdownRunning: Ref<boolean> = ref(false);

  // 定义倒计时函数
  const startCountdown = () => {
    // 如果倒计时不在运行中，则开始倒计时
    if (!isCountdownRunning.value) {
      countdown.value = initialCountdown;
      isCountdownRunning.value = true;

      const timer = setInterval(() => {
        countdown.value--;

        // 倒计时结束，停止计时器，并将 isCountdownRunning 置为 false
        if (countdown.value <= 0) {
          clearInterval(timer);
          isCountdownRunning.value = false;
        }
      }, 1000);
    }
  };

  // 监听 isCountdownRunning 的变化，当倒计时结束后，重新设置倒计时的状态
  watchEffect(() => {
    if (countdown.value <= 0) {
      countdown.value = initialCountdown;
    }
  });

  // 返回倒计时功能函数的 API
  return {
    countdown,
    isCountdownRunning,
    startCountdown,
  };
};

export default useCountdown;
