import dayjs from "dayjs"; // 导入 Day.js
import "dayjs/locale/zh-cn"; // 导入中文本地化插件

// 设置 Day.js 使用中文本地化
dayjs.locale("zh-cn");

function getCurrentTimePeriod(): string {
  // 获取当前时间的小时数
  const currentHour: number = dayjs().hour();

  // 根据小时数判断是上午、中午还是下午
  if (currentHour >= 0 && currentHour < 6) {
    return "凌晨";
  } else if (currentHour >= 6 && currentHour < 12) {
    return "上午";
  } else if (currentHour >= 12 && currentHour < 14) {
    return "中午";
  } else if (currentHour >= 14 && currentHour < 18) {
    return "下午";
  } else if (currentHour >= 18 && currentHour < 24) {
    return "晚上";
  } else {
    return "未知";
  }
}

export default getCurrentTimePeriod;
