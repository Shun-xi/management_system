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
        <a-image
          class="object-cover rounded-[50%]"
          style="height: 32px"
          :preview="false"
          :width="32"
          :height="32"
          :src="item.avatar"
          fallback="data:image/png;base64,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"
        />
        <div class="flex-1 flex items-center justify-between ml-[15px]">
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
              @click="onRemoveDisplay(item.id, item.username)"
              v-else-if="
                participant.includes(item.id) &&
                username === dataCurrentUser?.rows[0].username
              "
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

            <!-- 已加入 开始 -->
            <div
              class="flex items-center text-[#8c8c8c]"
              v-else-if="
                participant.includes(item.id) &&
                username !== dataCurrentUser?.rows[0].username
              "
            >
              <Icon icon="icon-park-outline:people" class="mr-[5px]" />
              已加入
            </div>
            <!-- 已加入 结束 -->

            <!-- 邀请 开始 -->
            <div v-else>
              <a-button
                type="primary"
                class="bg-[#409eff] flex items-center"
                v-if="inviteStatus[item.id]"
                @click="Invite(item.id)"
              >
                <Icon icon="icon-park-outline:people-plus" class="mr-[5px]" />
                邀请
              </a-button>
              <a-button
                type="primary"
                class="bg-[#409eff] flex items-center"
                v-else
                :disabled="!inviteStatus[item.id]"
              >
                <Icon icon="icon-park-outline:people-plus" class="mr-[5px]" />
                已邀请
              </a-button>
            </div>
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

  <a-modal
    v-model:open="remove"
    title="温馨提示"
    :centered="true"
    width="420px"
    :zIndex="1001"
  >
    <template #footer>
      <a-button key="back" @click="remove = false">取消</a-button>
      <a-button
        key="submit"
        type="primary"
        @click="onRemoveCallback"
        class="bg-[#66b1ff]"
      >
        确定
      </a-button>
    </template>

    <div class="flex items-center text-[#606266] py-[10px]">
      <Icon
        icon="fxemoji:warningsign"
        class="mr-[10px] text-[24px]"
      />你确定要将 {{ clickOnUsername }} 移出此项目吗
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import {
  projectCreatorInformation,
  changeUserStatusRemove,
  changeUserStatusInvite,
} from "@/service/index";
import { message } from "ant-design-vue";
import store from "storejs";

// 路由解析
const route = useRoute();

// 控制 对话框的显示隐藏
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};

const owner = ref<number[]>([]); // 拥有者
const participant = ref<number[]>([]); // 参与者
const userCurrent = ref(1); // 当前页码
const userLimit = ref(6); // 每一页的数据条数
const username = store.get("username"); // 当前用户
const inviteStatus = ref<{ [key: string]: boolean | undefined }>({}); // 存储每个用户的按钮状态

// 函数 区分用户
function distinguishUsers() {
  owner.value = []; // 拥有者
  participant.value = []; // 参与者
  if (dataCurrentUser.value) {
    dataCurrentUser.value.rows.forEach((item, index) => {
      index === 0 ? owner.value.push(item.id) : participant.value.push(item.id);
    });
  }
}

// 请求 当前项目用户
const { data: dataCurrentUser, run: runCurrentUser } = useRequest(
  (obj) => projectCreatorInformation(obj),
  {
    manual: true,
    onSuccess(data) {
      distinguishUsers();
      if (username === data.rows[0].username) {
        runAllUsers({
          keyword: "",
          limit: 6,
          offset: (userCurrent.value - 1) * 6,
        });
      } else {
        runAllUsers({
          keyword: "",
          limit: 6,
          offset: (userCurrent.value - 1) * 6,
          project_id: route.params.id,
        });
      }
    },
  },
);
// 请求 所有用户
const { data: dataAllUsers, run: runAllUsers } = useRequest(
  (obj) => projectCreatorInformation(obj),
  {
    manual: true,
    onSuccess(data) {
      data.rows.forEach((item) => {
        inviteStatus.value[item.id] = true;
      });
    },
  },
);

// 监听 route
watch(
  [route],
  () => {
    if (route.path.includes("/projectManagement/project")) {
      runCurrentUser({ project_id: route.params.id });
      userCurrent.value = 1;
    }
  },
  { immediate: true },
);
// 监听 userCurrent
watch([userCurrent], () => {
  runAllUsers({ keyword: "", limit: 6, offset: (userCurrent.value - 1) * 6 });
});

// 更改用户状态 移出
const remove = ref(false);
const clickOnID = ref();
const clickOnUsername = ref();

// 请求 更改用户状态 移出
const { run: runChangeUserStatus } = useRequest(
  (obj) => changeUserStatusRemove(obj),
  {
    manual: true,
    onSuccess() {
      runCurrentUser({ project_id: route.params.id });
    },
  },
);

// 函数 更改用户状态 邀请
function Invite(id: number) {
  runChangeUserStatusInvite({
    group: "Projects",
    group_id: Number(route.params.id),
    receiver_id: id,
  });
  if (dataAllUsers.value) {
    inviteStatus.value[id] = false;
    console.log(inviteStatus.value);
  }
}

// 请求 更改用户状态 邀请
const { run: runChangeUserStatusInvite } = useRequest(
  (obj) => changeUserStatusInvite(obj),
  {
    manual: true,
    onSuccess() {
      message.success({
        content: () => "已成功发出邀请",
        class: "globalPrompt",
      });
    },
  },
);

const onRemoveDisplay = (id: number, username: string) => {
  clickOnID.value = id;
  clickOnUsername.value = username;
  remove.value = true;
};

const onRemoveCallback = () => {
  remove.value = false;
  runChangeUserStatus({
    project_id: route.params.id,
    user_id: clickOnID.value,
  });
};

// 搜索
const projectSearchvalue = ref("");

// 监听 搜索
watch([projectSearchvalue], () => {
  runAllUsers({
    keyword: projectSearchvalue,
    limit: 6,
    offset: (userCurrent.value - 1) * 6,
  });
});
</script>

<style lang="scss">
.customizeDialogBoxStyles {
  .ant-modal-content {
    padding: 20px 0;
    border-radius: 0;

    .ant-modal-header {
      padding: 0 0 15px 20px;
      border-bottom: 1px solid #dfe2e8;
      font-size: 18px;
    }
  }
}

/* 全局提示 */
.globalPrompt {
  .ant-message-notice-content {
    width: 320px;
    background: #f0f9eb;
    color: #67c23a;
    font-size: 14px;

    div {
      display: flex;
      align-items: center;
    }
  }
}
</style>
