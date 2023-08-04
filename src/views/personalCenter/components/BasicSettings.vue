<template>
  <a-form
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    class="relative"
  >
    <a-form-item label="用户名">
      <a-input
        v-model:value="formState.name"
        :placeholder="data ? data.username : ''"
        disabled
      />
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input
        v-model:value="formState.name"
        :placeholder="data ? data.email : ''"
        disabled
      />
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="公司">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="城市">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <div
      @click="showModal"
      class="absolute top-5 right-5 h-[239px] w-[239px] overflow-hidden rounded-[50%] border border-[#ccc]"
    >
      <Icon
        ref="iconRef"
        class="absolute top-[80px] right-[70px] z-[99] w-[100px] h-[100px] opacity-0 hover:opacity-100 str"
        icon="fluent:add-32-filled"
        color="white"
        width="20"
      />
      <img
        v-if="data && data.avatar.url"
        :src="data.avatar.url"
        alt=""
        class="h-[100%] w-[100%] rounded-[50%] imgs"
        :style="data.avatar.img"
      />
      <img
        v-else
        :src="data ? data.avatar : ''"
        alt=""
        class="h-[100%] w-[100%] rounded-[50%] imgs"
      />
    </div>
    <!-- 对话框 -->
    <div>
      <a-modal
        v-model:open="open"
        :footer="null"
        title="修改头像"
        @ok="hideModal"
        width="680px"
      >
        <hr />
        <div class="w-[656px] h-[501px] py-[30px]">
          <div class="w-[656px] h-[400px] flex justify-between py-[30px]">
            <div class="w-[350px] h-[350px] bg-[#ccc]">
              <vueCropper
                ref="cropper"
                :img="option.img"
                :info="true"
                :info-true="option.infoTrue"
                :auto-crop="option.autoCrop"
                :fixed-box="option.fixedBox"
                :can-move="option.canMoveBox"
                :can-scale="option.canScale"
                :fixed="option.fixed"
                :full="option.full"
                :center-box="option.centerBox"
                @realTime="realTime"
              ></vueCropper>
            </div>
            <div class="flex items-center avatar-upload-preview">
              <img
                :src="previews.url"
                alt=""
                class="imgs"
                :style="previews.img"
              />
            </div>
          </div>
          <div class="flex">
            <div class="pb-[15px]">
              <a-space wrap>
                <div
                  class="w-[95px] h-[40px] bg text-[white] rounded-xl text-center leading-[40px] relative hover:bg-[#574bad]"
                >
                  <input
                    class="rounded-xl opacity-0 z-[999] w-[100%] h-[100%] absolute top-0 left-0"
                    type="file"
                    name=""
                    value=""
                    id="avatarFile"
                    @change="handleFileChange"
                  />
                  选择图片
                </div>

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
    </div>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import { useRequest } from "vue-request";
import { Users } from "@/service";
import "vue-avatar-upload/lib/style.css";
const { data: data } = useRequest(() => Users());
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
const hideModal = () => {
  open.value = false;
};
interface FormState {
  name: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
const formState: UnwrapRef<FormState> = reactive({
  name: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 10 };
//获取点击文件路径
const imagePath = ref("");
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imagePath.value = URL.createObjectURL(file);
    console.log(imagePath.value); // 在控制台输出文件路径
  }
};
const option = reactive({
  img: imagePath,
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 150, // 默认生成截图框的宽度
  autoCropHeight: 150, // 默认生成截图框的长度
  fixedBox: true, // 是否固定截图框的大小 不允许改变
  info: false, // 裁剪框的大小信息
  outputSize: 1, // 裁剪生成图片的质量 [1至0.1]
  outputType: "png", // 裁剪生成图片的格式
  canScale: true, // 图片是否允许滚轮缩放
  fixed: false, // 是否开启截图框宽高固定比例
  // fixedNumber: [1, 1], // 截图框的宽高比例 需要配合centerBox一起使用才能生效 1比1
  full: false, // 是否输出原图比例的截图
  canMoveBox: false, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  accept: "image/jpeg,image/jpg,image/png,image/gif,image/x-icon",
});

const cropper = ref();
// 右转90度
const rotateRight = () => {
  if (cropper.value) {
    cropper.value.rotateRight();
  }
};
// 左转90度
const rotateLeft = () => {
  if (cropper.value) {
    cropper.value.rotateLeft();
  }
};
// 缩小
const changeScale = () => {
  if (cropper.value) {
    cropper.value.changeScale(-1);
  }
};
//放大
const changeScaleS = () => {
  if (cropper.value) {
    cropper.value.changeScale(1);
  }
};

//实时预览
interface Previews {
  url: string;
  img: string;
}
const previews = ref<Previews>({
  url: "",
  img: "",
});
// 裁剪之后的数据
const realTime = (data: any) => {
  previews.value = data;
  console.log(previews.value);
};
interface Avatar {
  url: string;
  img: string;
}
// 更新图片
const genxin = () => {
  data._rawValue.avatar = {
    url: previews.value.url,
    img: previews.value.img,
  } as Avatar;
  open.value = false;
};
</script>
<style lang="scss">
.hidden {
  display: inline-block;
}
.str {
  transition: 700ms;
}
.element {
  display: initial !important;
}

.background {
  background-color: #67c23a;
  border-color: #67c23a;
}

.background:where(.css-dev-only-do-not-override-eq3tly).ant-btn-primary:not(
    :disabled
  ):hover {
  color: #fff;
  background-color: #67c23a;
}
.bg {
  background-color: #1677ff;
}
.previews.img {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background-color: pink;
}
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
.imgs {
  max-width: none !important;
  /* min-width: 100%;
  min-height: 100%; */
}
</style>
