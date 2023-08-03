import { ref, watchEffect, Ref } from "vue";

const usePagination = <T>(
  dataSource: Ref<T[] | undefined>,
  pageSize: Ref<number>,
) => {
  const current = ref(1); // 当前页数
  const total = ref(dataSource.value?.length ?? 0); // 数据总条数
  // 监听数据总条数
  watchEffect(() => {
    total.value = dataSource.value?.length ?? 0;
  });

  const data = ref<T[]>(); // 返回当前页对应的数据片段
  // 监听当前显示数据
  watchEffect(() => {
    data.value = (dataSource.value ?? []).slice(
      (current.value - 1) * pageSize.value,
      current.value * pageSize.value,
    );
  });

  return {
    current, // 当前页数
    pageSize, // 每页数据条数
    total, // 数据总条数
    data, // 返回当前页对应的数据片段
  };
};

export default usePagination;
