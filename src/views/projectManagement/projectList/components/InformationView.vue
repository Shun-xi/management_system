<template>
  <a-modal
    v-model:open="open"
    :footer="null"
    title="修改头像"
    @ok="hideModal"
    @okcancel="okcancel"
    width="680px"
  >
    <hr />
    <div class="w-[656px] h-[500px] py-[20px]">
      <div class="w-[654px] h-[400px] flex justify-between py-[30px]">
        <div class="w-[350px] h-[350px]">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :autoCrop="option.autoCrop"
            :canMoveBox="option.canMoveBox"
            :canMove="option.canMove"
            :fillColor="option.fillColor"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedBox="option.fixedBox"
            :centerBox="option.centerBox"
            @realTime="realTime"
          >
          </vueCropper>
        </div>
        <div class="w-[250px] h-[350px] flex items-center">
          <div class="avatar-upload-preview">
            <img
              :src="previews.url"
              :style="previews.img"
              alt=""
              class="img_1"
            />
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="pb-[15px]">
          <a-space wrap>
            <a-button
              type="primary"
              class="w-[117px] h-[40px]"
              @click="SelectPicture"
              >选择图片</a-button
            >
            <input
              type="file"
              ref="fileInputRef"
              style="display: none"
              @change="handleFileChange"
            />
            <a-button
              type="primary"
              class="w-[56px] h-[40px]"
              @click="changeScaleS"
            >
              <Icon
                icon="iconoir:plus"
                color="white"
                width="20"
                class="element"
              />
            </a-button>
            <a-button
              type="primary"
              class="w-[56px] h-[40px]"
              @click="changeScale"
            >
              <Icon
                icon="iconamoon:sign-minus"
                color="white"
                width="20"
                class="element"
              />
            </a-button>
            <a-button
              type="primary"
              class="w-[56px] h-[40px]"
              @click="rotateLeft"
            >
              <Icon
                icon="lucide:rotate-ccw"
                color="white"
                width="15"
                class="element"
              />
            </a-button>
            <a-button
              type="primary"
              class="w-[56px] h-[40px]"
              @click="rotateRight"
            >
              <Icon
                icon="lucide:rotate-cw"
                color="white"
                width="15"
                class="element"
              />
            </a-button>
          </a-space>
        </div>
        <div class="ml-[97px]">
          <a-space wrap>
            <a-button
              type="primary"
              class="w-[70px] h-[40px] background"
              @click="genxin"
              >保存</a-button
            >
          </a-space>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRequest } from "vue-request";
import { upLoadFileRecord } from "@/service";
const isshowModalImg = defineProps<{
  showModalImg: boolean;
}>();
const emits = defineEmits(["updates"]);
const open = ref<boolean>(false);

const hideModal = () => {
  open.value = false;
};
watchEffect(() => {
  open.value = isshowModalImg.showModalImg;
});

const okcancel = () => {
  open.value = false;
};
const { data: dataUpLoadFileRecord, run: runUpLoadFileRecord } = useRequest(
  (formdata) => upLoadFileRecord(formdata),
  {
    manual: true,
  },
);
const formdata = new FormData();
const imagePath = ref("");
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  formdata.append("file", file ?? "");
  runUpLoadFileRecord(formdata);

  watchEffect(() => {
    if (dataUpLoadFileRecord.value) {
      emits("updates", dataUpLoadFileRecord.value.path);
    }
  });
  // cover.value = data.value;
  // imagesData.value=data
  if (file) {
    imagePath.value = URL.createObjectURL(file);
  }
};
// 编辑图片
const cropper = ref();
// 右旋转
const rotateRight = () => {
  cropper.value?.rotateRight();
};
// 左旋转
const rotateLeft = () => {
  cropper.value?.rotateLeft();
};
// +
const changeScale = () => {
  cropper.value?.changeScale(-1);
};
// -
const changeScaleS = () => {
  cropper.value?.changeScale(1);
};
// 获取图片
const fileInputRef = ref();
const SelectPicture = () => {
  fileInputRef.value.click();
};
// 组件
const option = reactive({
  img: imagePath,
  outputType: "png",
  size: 1,
  autoCrop: true,
  canMoveBox: true,
  canMove: false,
  fillColor: "#000",
  autoCropWidth: "200px",
  autoCropHeight: "200px",
  fixed: true,
  fixedBox: true,
  enlarge: 1,
  centerBox: true,
});
const previews: any = ref({});
const realTime = (data: any) => {
  previews.value = data;
  console.log("url", previews.value.url);
};
// 更新图片
const genxin = () => {
  open.value = false;
  runUpLoadFileRecord(formdata);
  watchEffect(() => {
    if (dataUpLoadFileRecord.value) {
      console.log("777", dataUpLoadFileRecord.value.path);
      emits("updates", dataUpLoadFileRecord.value.path);
    }
  });
};
</script>
<style>
.images {
  box-shadow: 0 0 10px #ccc;
}

.element {
  display: initial !important;
}

.abc {
  box-shadow: 0 0 4px #ccc;
}

.background {
  background-color: #67c23a;
}

.background:where(.css-dev-only-do-not-override-eq3tly).ant-btn-primary:not(
    :disabled
  ):hover {
  color: #fff;
  background-color: #67c23a;
}
.plus {
  transition: 500ms;
  transform: translate(-50%, -50%);
}

.avatar-upload-preview {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
}

.img_1 {
  max-width: none !important;
}
</style>
