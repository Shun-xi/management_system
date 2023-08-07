<template>
  <!-- 外层盒子 -->
  <div class="w-[1076px] h-[calc(100vh-192px)] m-auto bg-[#fff]">
    <!-- 上传文件头部 -->
    <div class="w-[100%] h-[60px] flex justify-between items-center px-[20px]">
      <p>我的文件</p>
      <div class="relative">
        <a-button
          v-if="GroupMember"
          type="primary"
          ghost
          class="flex items-center"
        >
          <Icon icon="material-symbols:cloud-upload" />
          上传
        </a-button>
        <a-button
          v-else
          :disabled="true"
          type="primary"
          ghost
          class="flex items-center z-10"
        >
          <Icon icon="material-symbols:cloud-upload" />
          上传
        </a-button>
        <input
          @change="change"
          type="file"
          class="absolute opacity-0 top-0 left-0 w-[74px] h-[32px]"
        />
      </div>
    </div>
    <!-- 文字标识部分 -->
    <div
      class="flex justify-between items-center w-[100%] py-[10px] px-[20px] border-b-[1px] border-[#e5e5e5] text-[14px] text-[#8C8C8C]"
    >
      <p class="w-[62.5%]">名称</p>
      <p class="w-[8.5%]">大小</p>
      <p class="w-[12.5%]">创建日期</p>
      <p class="w-[8.5%]">创建人</p>
      <p class="w-[8.5%]"></p>
    </div>
    <!-- 文件部分 -->
    <div
      v-show="item.is_recycle === 0"
      v-for="item in dataFileCreate?.rows"
      :key="item.id"
      class="flex items-center w-[100%] h-[50px] px-[20px] text-[14px] text-[#8C8C8C]"
    >
      <div class="flex items-center w-[62.5%] text-[black]">
        <img
          :src="`http://192.168.122.36:1024${item.path}`"
          alt=""
          class="w-[32px] h-[32px] rounded-[8px] mr-[10px]"
        />
        <a
          :href="`http://192.168.122.36:1024${item.path}`"
          target="blank"
          class="hover:text-[#1b9aee]"
        >
          {{ item.title }}{{ item.extension }}
        </a>
      </div>
      <p class="w-[8.5%]">{{ formatSize(item.size) }}</p>
      <p class="w-[12.5%]">
        {{ dayjs(item.updated_at).subtract(1, "day").format("M月D日 HH:mm") }}
      </p>
      <p class="w-[8.5%]">
        {{ uploadUsers[item.creator_id] }}
      </p>
      <div class="flex justify-between items-center w-[8.5%]">
        <Icon
          icon="clarity:download-line"
          class="text-[16px] cursor-pointer"
          @click="downloadFile(item)"
        />
        <Icon icon="carbon:edit" class="ml-[10px] text-[16px] cursor-pointer" />
        <a-dropdown
          placement="bottom"
          :arrow="{ pointAtCenter: true }"
          :trigger="['click']"
          class="cursor-pointer"
        >
          <a class="ant-dropdown-link" @click.prevent>
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" class="dropDownItem">
                  <Icon icon="ci:link" class="mr-[5px]" />
                  复制链接
                </a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" class="dropDownItem">
                  <Icon icon="ph:trash-bold" class="mr-[5px]" />
                  移到回收站
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {
  UserFileName,
  FileCreate,
  UploadFile,
  ImgProjectFiles,
  userInformation,
} from "@/service";
import { DownOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { saveAs } from "file-saver";

const route = useRoute();
const uploadUsers = ref<{ [x: number]: string }>({});
const GroupMember = ref(true);

// 获取用户信息
const { data: dataInformation } = useRequest(() => userInformation(), {
  onSuccess() {
    runUserFileName();
  },
});

// 请求 获取用户项目数据
const { data: dataUserFileNme, run: runUserFileName } = useRequest(
  () =>
    UserFileName({
      project_id: Number(route.params.id),
    }),
  {
    manual: true,
    onSuccess(data) {
      data.rows.map((item) => {
        uploadUsers.value[item.id] = item.username;
      });
      for (const item of data.rows) {
        GroupMember.value =
          dataInformation.value.data.username === item.username;
        if (GroupMember.value) {
          return;
        }
      }
    },
  },
);

// 请求 获取文件内部数据
const { data: dataFileCreate, run: runFileCreate } = useRequest(() =>
  FileCreate({
    project_id: Number(route.params.id),
    prop_order: "id",
    order: "desc",
  }),
);

// 上传文件数据请求
function change(e: Event) {
  const fd = new FormData();
  const files = (e.target as HTMLInputElement).files;
  if (files?.["0"]) {
    fd.append("file", files[0]);
  }
  UploadFile(fd).then((res) => {
    // eslint-disable-next-line no-undef
    let dataUrl: IdataUrl;
    dataUrl = res;
    dataUrl.creator_id = dataInformation.value?.data.id as number;
    dataUrl.project_id = Number(route.params.id);
    dataUrl.title = res.filename.replace(res.extension, "");
    ImgProjectFiles(dataUrl).then(() => {
      runFileCreate();
    });
    notification.open({
      type: "success",
      placement: "bottomLeft",
      message: `图片上传成功`,
    });
  });
}

// 计算内存函数
function formatSize(size: number) {
  if (size < 1024) {
    return size + " b";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " Kb";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " Mb";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " Gb";
  }
}

// 下载文件
function downloadFile(item) {
  // 假设您有一个文件的 Blob 数据或者 URL
  const fileImg = "http://api.cc0820.top:7001/" + item.path;
  const fileName = item.filename;

  // 使用 Fetch API 获取文件数据（注意：这里使用的是 async/await 语法）
  fetch(fileImg)
    .then((response) => response.blob()) // 获取文件的 Blob 数据
    .then((fileBlob) => {
      // 将数据保存为文件并触发下载
      saveAs(fileBlob, fileName);
    })
    .catch((error) => {
      console.error("下载文件失败:", error);
    });
}
</script>

<style>
.uploadButton:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.dropDownItem {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
