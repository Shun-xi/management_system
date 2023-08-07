<template>
  <div>
    <!-- 项目模板 -->
    <a-layout-content style="margin: 0 16px">
      <!-- 顶部导航栏 -->
      <div class="p-[20px] overflow-hidden w-[78vw] h-[100%] bg-[#F4F4F4]">
        <!-- 顶部项目列表的选项卡 -->
        <a-tabs
          :tab-position="modeTop"
          class="bg-[#fff] p-[20px]"
          :style="{ height: '100%', width: '100%' }"
        >
          <!-- 顶部单个项目的选项卡面板 -->
          <a-tab-pane v-for="item in customTemplate" :key="item.ID">
            <template #tab>
              <!-- 每个选项卡的内容 -->
              <div
                class="flex items-center"
                @click="routerProjectTemplate(item.ID)"
              >
                <!-- 项目名称 -->
                {{ item.Text }}
              </div>
            </template>
            <!-- 自定义模板 -->
            <div v-if="numIndex == 8">
              <div
                v-for="item in project_templates"
                :key="item.id"
                class="bottom w-[100%] h-[70px] py-[10px] border-b-1 border-[#e8e8e8] flex"
              >
                <!-- 图片 -->
                <div class="w-[50px] h-[50px]">
                  <a-image
                    :width="50"
                    :height="50"
                    :preview="false"
                    class="w-[50px] h-[50px] object-cover"
                    :src="'http://192.168.122.36:1024' + item.cover"
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                  />
                </div>
                <!-- 图片结束 -->
                <!-- 项目名称介绍 -->
                <div class="flex ml-[10px] w-[63vw] flex-col">
                  <!-- top -->
                  <div>
                    <span class="cursor-pointer text-[14px]">{{
                      item.name
                    }}</span>
                  </div>
                  <div class="leading-[25px] mt-[5px]">
                    <p class="txt">{{ item.intro }}</p>
                  </div>
                </div>
                <!-- 项目名称结束 -->
                <!-- 创建图标 -->
                <div class="txt w-[160px] flex justify-end items-center">
                  <div
                    class="p-[7px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
                  >
                    <svg
                      class="w-[12px] h-[12px] text-[#606266]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="512"
                      height="512"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M186.2 139.6h139.6V0H186.2v139.6zM372.4 0v139.6H512V0H372.4zM0 139.6h139.6V0H0v139.6zm186.2 186.2h139.6V186.2H186.2v139.6zm186.2 0H512V186.2H372.4v139.6zM0 325.8h139.6V186.2H0v139.6zM186.2 512h139.6V372.4H186.2V512zm186.2 0H512V372.4H372.4V512zM0 512h139.6V372.4H0V512z"
                      />
                    </svg>
                  </div>
                  <div
                    class="p-[7px] rounded-[50%] ml-[10px] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
                  >
                    <svg
                      class="w-[12px] h-[12px] text-[#606266]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1024"
                      height="1024"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="m199.04 672.64l193.984 112l224-387.968l-193.92-112l-224 388.032zm-23.872 60.16l32.896 148.288l144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112l56.704-98.112l-193.984-112l-56.64 98.112zM104.32 708.8l384-665.024l304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z"
                      />
                    </svg>
                  </div>
                  <div
                    class="p-[7px] ml-[10px] rounded-[50%] border-[1px] border-[#DCDFE6] w-[27.6px] h-[27.6px]"
                  >
                    <Icon
                      icon="icon-park-outline:delete"
                      class="text-[12px] text-[#606266]"
                    />
                  </div>
                </div>
                <!-- 创建图标结束 -->
              </div>
            </div>
            <!-- 公共模板 -->
            <div v-else class="h-[75px] py-[15px] flex justify-between bottom">
              <div class="flex">
                <!-- 图裂 -->
                <div class="w-[50px] h-[50px] flex items-center justify-center">
                  <Icon icon="mingcute:pic-line" />
                </div>
                <!-- 产品进展 -->
                <div class="w-[160px] h-[50px] ml-[10px]">产品进展</div>
              </div>
              <!-- 产品计划 -->
              <div class="flex txt">
                <div class="flex items-center">
                  产品计划
                  <svg
                    class="w-[12px] h-[12px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="256"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"
                    />
                  </svg>
                </div>
                <div class="flex items-center">
                  即将发布
                  <svg
                    class="w-[12px] h-[12px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="256"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"
                    />
                  </svg>
                </div>
                <div class="flex items-center">
                  测试
                  <svg
                    class="w-[12px] h-[12px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="256"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"
                    />
                  </svg>
                </div>
                <div class="flex items-center">
                  准备发布<svg
                    class="w-[12px] h-[12px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="256"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"
                    />
                  </svg>
                </div>
                <div class="flex items-center">发布成功</div>
              </div>
            </div>
          </a-tab-pane>

          <!-- 顶部导航栏右侧的额外内容 -->
          <template #rightExtra>
            <a-button
              type="primary"
              class="bg-[#409EFF] h-[40px] flex items-center justify-center text-[14px]"
            >
              <Icon icon="mdi:add" class="text-[18px]" />
              创建项目模板
            </a-button>
          </template>
        </a-tabs>
      </div>
      <!-- 顶部导航栏结束 -->
    </a-layout-content>
  </div>
</template>
<script lang="ts" setup>
import { featproject_templates } from "@/service/index";
import type { TabsProps } from "ant-design-vue";
const numIndex = ref(8);
const customTemplate = ref([
  { ID: 8, Text: "自定义模板" },
  { ID: 9, Text: "公共模板" },
]);

const { data: project_templates } = useRequest(() =>
  featproject_templates({ is_custom: 1, limit: 1000, offset: 0 }),
);
const routerProjectTemplate = ref((index: number) => {
  numIndex.value = index;
});
const modeTop = ref<TabsProps["tabPosition"]>("top");
// console.log("666", project_templates);
</script>
<style>
.bottom {
  border-bottom: 1px solid #e8e8e8;
}
</style>
