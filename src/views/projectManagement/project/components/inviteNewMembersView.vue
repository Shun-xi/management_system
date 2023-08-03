<template>
  <div
    class="cursor-pointer text-[14px] text-[#5fafff] flex items-center"
    @click="showModal"
  >
    <Icon class="mr-[5px]" icon="icon-park-solid:people" />{{
      dataCurrentUser?.count
    }}
  </div>

  <a-modal
    v-model:open="open"
    title="邀请新成员"
    @ok="handleOk"
    width="540px"
    class="customizeDialogBoxStyles"
    :destroyOnClose="true"
  >
    <div class="px-[20px] pb-[15px]">
      <div class="flex items-center justify-between h-[40px] text-[14px]">
        <div>账号邀请</div>
        <div class="text-[#c0c4cc]">通过链接邀请</div>
      </div>
      <a-input
        v-model:value="projectSearchvalue"
        placeholder="请输入用户名或邮箱查找"
        class="h-[40px]"
      >
        <template #prefix>
          <Icon
            class="mr-[5px] text-[#cec6d6]"
            icon="simple-line-icons:magnifier"
          />
        </template>
      </a-input>
    </div>
    <div class="min-h-[300px] px-[20px]">
      <div
        v-for="item in dataAllUsers?.rows"
        :key="item.id"
        class="h-[70px] py-[12px] flex items-center border-t border-[#e8e8e8]"
      >
        <img
          :src="item.avatar"
          alt=""
          class="w-[32px] h-[32px] rounded-[50%] bg-black mr-[15px]"
        />
        <div class="flex-1 flex items-center justify-between">
          <div class="text-[14px]">
            <div class="text-[#606266]">{{ item.username }}</div>
            <div class="text-[#8c8c8c]">{{ item.email }}</div>
          </div>
          <div class="flex items-center">
            <!-- 拥有者 开始 -->
            <div
              class="flex items-center text-[#8c8c8c]"
              v-if="owner[0] === item.id"
            >
              <Icon icon="fluent-mdl2:party-leader" class="mr-[5px]" />
              拥有者
            </div>
            <!-- 拥有者 结束 -->

            <!-- 移出 开始 -->
            <a-button
              type="primary"
              danger
              class="flex items-center"
              v-else-if="participant.includes(item.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 48 48"
                class="mr-[5px]"
              >
                <g fill="none" stroke="currentColor" stroke-width="4">
                  <circle cx="24" cy="24" r="20" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m17 31l14-14m-12 2l-2-2m14 14l-2-2"
                  />
                </g>
              </svg>
              移出
            </a-button>
            <!-- 移出 结束 -->

            <!-- 邀请 开始 -->
            <a-button
              type="primary"
              class="bg-[#409eff] flex items-center"
              v-else
            >
              <Icon icon="icon-park-outline:people-plus" class="mr-[5px]" />
              邀请
            </a-button>
            <!-- 邀请 结束 -->
          </div>
        </div>
      </div>
    </div>
    <a-pagination
      class="w-[100%] flex items-center justify-center mt-[15px]"
      v-model:current="userCurrent"
      :defaultPageSize="userLimit"
      :total="dataAllUsers?.count"
      :hideOnSinglePage="true"
      :showSizeChanger="false"
    />
    <template #footer></template>
  </a-modal>
</template>

<script lang="ts" setup>
import { projectCreatorInformation } from "@/service/index";

// 路由解析
const route = useRoute();

const owner = ref<number[]>([]); // 拥有者
const participant = ref<number[]>([]); // 参与者

// 请求 当前项目用户
const { data: dataCurrentUser, run: runCurrentUser } = useRequest(
  (obj) => projectCreatorInformation(obj),
  {
    manual: true,
    onSuccess(data) {
      data.rows.forEach((item, index) => {
        if (index === 0) {
          // 索引等于 0 的 id 存放到 owner 数组中
          owner.value.push(item.id);
        } else if (index > 0) {
          // 大于零的 id 存放到 participant 数组中
          participant.value.push(item.id);
        }
      });
    },
  },
);
// 请求 所有用户
const { data: dataAllUsers, run: runAllUsers } = useRequest(
  (obj) => projectCreatorInformation(obj),
  {
    manual: true,
  },
);

watch(
  [route],
  () => {
    runCurrentUser({ project_id: route.params.id });
    runAllUsers({ keyword: "", limit: 6, offset: 0 });
  },
  { immediate: true },
);

// 分页
const userCurrent = ref(1); // 当前页码
const userLimit = ref(6); // 每一页的数据条数
watch([userCurrent], () => {
  runAllUsers({ keyword: "", limit: 6, offset: (userCurrent.value - 1) * 6 });
});

const open = ref<boolean>(false);

const projectSearchvalue = ref("");

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>

<style lang="scss">
.customizeDialogBoxStyles {
  .ant-modal-content {
    padding: 20px 0;

    .ant-modal-header {
      padding: 0 0 15px 20px;
      border-bottom: 1px solid #dfe2e8;
      font-size: 18px;
    }
  }
}
</style>
