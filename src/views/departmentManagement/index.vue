<template>
  <div class="bg-[#F5F5F5] py-[20px] Height">
    <a-layout class="w-[1100px] h-[100%] m-auto p-[20px] bg-[#fff]">
      <!-- 左侧列表 -->
      <a-layout-sider
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        class="sidebar"
      >
        <!-- 搜索框开始 -->
        <div class="w-[226px] h-[34px]">
          <a-input
            type="text"
            placeholder="输入'用户名/邮箱'回车搜索"
            v-model:value="SearchUseInf"
            class="h-[34px] w-[226px] border-[1px] border-[#E8E8E8] rounded-[8px]"
            @keyup.enter="searchUser"
          >
            <template #prefix>
              <Icon
                icon="iconamoon:search-thin"
                class="text-[20px] text-[#B6A3B7]"
              />
            </template>
          </a-input>
        </div>
        <!-- 搜索框结束 -->
        <div class="leading-[52px] text-[#8C8C8C] pl-[20px]">成员</div>
        <!-- 成员开始 -->
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
          class="bg-[#fff] text-[#000]"
        >
          <a-menu-item
            key="1"
            class="leftList1"
            @click="
              userDataFunction({ keyword: SearchUseInf });
              toggleElementDeny();
              showDepartmentValue('所有成员');
            "
          >
            <Icon icon="formkit:people" class="text-[20px] mr-[8px]" />
            <span class="nav-text">所有成员</span>
          </a-menu-item>
          <a-menu-item
            key="2"
            @click="
              userDataFunction({
                keyword: SearchUseInf,
                date_after_created: '2023-07-02 00:00:00',
              });
              toggleElementDeny();
              showDepartmentValue('新加入的成员');
            "
          >
            <Icon
              icon="icon-park-outline:people-plus-one"
              class="text-[20px] mr-[8px]"
            />
            <span class="nav-text">新加入的成员</span>
          </a-menu-item>
          <a-menu-item
            key="3"
            @click="
              userDataFunction({ keyword: SearchUseInf, department_id: 0 });
              toggleElementDeny();
              showDepartmentValue('未分配部门的成员');
            "
          >
            <Icon
              icon="icon-park-outline:people"
              class="text-[20px] mr-[8px]"
            />
            <span class="nav-text">未分配部门的成员</span>
          </a-menu-item>
          <a-menu-item
            key="4"
            @click="
              userDataFunction({ keyword: SearchUseInf, state: 0 });
              toggleElementDeny();
              showDepartmentValue('停用的成员');
            "
          >
            <Icon
              icon="fluent-mdl2:people-block"
              class="text-[20px] mr-[8px]"
            />
            <span class="nav-text">停用的成员</span>
          </a-menu-item>
        </a-menu>
        <!-- 成员结束 -->
        <div
          class="leading-[52px] text-[#8C8C8C] my-[10px] pr-[20px] pl-[20px] flex items-center justify-between"
        >
          <span>部门</span>
          <div class="flex items-center" style="cursor: not-allowed">
            <Icon
              icon="fluent-mdl2:add-to"
              class="text-[20px] text-[#8C8C8C] mr-[6px]"
            />
            <span>创建部门</span>
          </div>
        </div>
        <!-- 部门开始 -->
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
          class="bg-[#fff] text-[#000]"
        >
          <a-menu-item
            v-for="(item, index) in DepartmentSorting"
            :key="item.id"
            @click="
              userDataFunction({
                keyword: SearchUseInf,
                department_id: item.id,
              });
              toggleElement();
              showDepartmentValue(item.name, item, index);
            "
          >
            <Icon
              icon="mingcute:department-fill"
              class="text-[20px] mr-[8px]"
            />
            <span class="nav-text">{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
        <!-- 部门结束 -->
      </a-layout-sider>
      <!-- 右侧列表 -->
      <a-layout class="border-l-[1px] border-l-[#E8E8E8] pl-[24px] bg-[#fff]">
        <!-- 头部 -->
        <a-layout-header
          :style="{ background: '#fff', padding: '0 0 0 0', height: '48px' }"
          class="flex items-start justify-between"
        >
          <div class="leading-[20px] text-[18px]">
            <span>{{ selectedValue }}.</span
            ><span class="px-[5px]">{{ UserData?.data.rows.length }}</span>
          </div>
          <div v-show="showElement" class="flex items-center">
            <div
              class="flex items-center leading-[30px] text-[#C0C4CC]"
              style="cursor: not-allowed"
            >
              <Icon
                icon="icon-park-outline:people-plus-one"
                class="text-[14px]"
              />
              <span class="ml-[5px]">添加新成员</span>
            </div>
            <div
              class="flex items-center leading-[30px] ml-[15px] cursor-pointer text-[#409EFF]"
            >
              <Icon icon="circum:edit" class="text-[16px]" />
              <span class="ml-[5px]" @click="department(true)">编辑部门</span>
            </div>
            <div
              class="flex items-center leading-[30px] ml-[15px] text-[#C0C4CC]"
              style="cursor: not-allowed"
            >
              <Icon icon="uiw:delete" />
              <span class="ml-[5px]">删除部门</span>
            </div>
          </div>
        </a-layout-header>
        <!-- 内容 -->
        <a-layout-content :style="{ margin: '0 0 0 0' }">
          <div
            v-for="item in UserData?.data.rows"
            :key="item.id"
            class="h-[68px] border-t-[1px] border-t-[#E8E8E8] flex items-center justify-between"
          >
            <div class="flex items-center justify-between">
              <div>
                <img
                  :src="item.avatar"
                  alt=""
                  class="w-[32px] h-[32px] rounded-[50%]"
                />
              </div>
              <div class="ml-[15px] flex flex-col">
                <div>
                  <span
                    class="cursor-pointer hover:text-[#1890FF] text-[14px]"
                    @click="
                      (detailedInformation = true),
                        InformationFunction({ id: item.id })
                    "
                    >{{ item.username }}</span
                  >
                </div>
                <div>
                  <span class="text-[14px] text-[#999] mr-[15px]">{{
                    item.email
                  }}</span>
                  <span class="text-[14px] text-[#999]">{{
                    item.department?.name
                  }}</span>
                </div>
              </div>
            </div>
            <div
              v-show="showElement"
              class="flex items-center justify-between w-[80px]"
            >
              <a-popconfirm
                placement="bottom"
                title="确定禁用此用户吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirm(item.id, 0)"
                v-if="item.state === 1"
              >
                <template #icon
                  ><question-circle-outlined style="color: orange" />
                </template>
                <a-popover color="#303133">
                  <template #content>
                    <div class="text-[#fff]">禁用</div>
                  </template>
                  <a-button
                    shape="circle"
                    class="flex justify-center items-center"
                  >
                    <Icon
                      icon="fluent:prohibited-28-regular"
                      :horizontalFlip="true"
                    />
                  </a-button>
                </a-popover>
              </a-popconfirm>
              <a-popconfirm
                placement="bottom"
                title="确定启用此用户吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirm(item.id, 1)"
                v-else
              >
                <template #icon
                  ><question-circle-outlined style="color: orange" />
                </template>
                <a-popover color="#303133">
                  <template #content>
                    <div class="text-[#fff]">启用</div>
                  </template>
                  <a-button
                    shape="circle"
                    class="flex justify-center items-center"
                  >
                    <Icon icon="teenyicons:tick-circle-outline" />
                  </a-button>
                </a-popover>
              </a-popconfirm>
              <span class="w-[1px] h-[20px] bg-[#ccc]"></span>
              <div
                class="w-[30px] h-[30px] border-[#DFE2E8] border-[1px] rounded-[50%] flex items-center justify-center"
                style="cursor: not-allowed"
              >
                <Icon
                  icon="icon-park-outline:people-minus"
                  class="text-[#666]"
                />
              </div>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!-- 编辑部门 -->
    <div id="components-modal-demo-position">
      <a-modal
        v-model:open="modal1Visible"
        style="top: 20px; width: 400px; padding: 0"
        @EditingDepartmentData="department(true)"
        class="mt-[200px] masking-out EditingDepartmentCss"
      >
        <div
          class="border-b-[1px] border-b-[#DCDFE6] leading-[60px] pl-[20px] text-[16px]"
        >
          <span>编辑部门</span>
        </div>
        <div class="pt-[30px] pb-[40px] px-[20px] DepartmentSearchBox">
          <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 15 }"
          >
            <a-form-item
              label="部门名称"
              name="DepartmentNameValue"
              :rules="[{ required: true, message: '部门为必填项' }]"
            >
              <a-input
                v-model:value="formState.DepartmentNameValue"
                class="h-[40px]"
              />
            </a-form-item>
            <a-form-item label="排序" name="sort">
              <a-input v-model:value="formState.sortValue" class="h-[40px]" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 7, span: 16 }">
              <a-button
                html-type="button"
                class="bg-[#409EFF] text-[#fff] h-[40px] w-"
                @click="
                  EditingDepartmentDataFn(
                    Number(formState.sortValue),
                    formState.DepartmentNameValue,
                  )
                "
                >编辑</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
    <!-- 详细信息 -->
    <div id="components-modal-demo-position">
      <a-modal
        v-model:open="detailedInformation"
        style="width: 460px"
        centered
        @ok="detailedInformation = false"
        class="detailedInformation"
      >
        <div
          class="border-b-[1px] border-b-[#DCDFE6] leading-[60px] text-[16px] text-center font-[900]"
        >
          {{ InformationData?.data.username }}详情信息
        </div>

        <div class="py-[40px] px-[20px]">
          <!-- 头像 -->
          <div class="flex flex-col items-center">
            <div>
              <img
                :src="InformationData?.data.avatar"
                alt=""
                class="w-[64px] h-[64px] rounded-[50%]"
              />
            </div>
            <span class="leading-[60px] text-[16px]">{{
              InformationData?.data.username
            }}</span>
          </div>
          <!-- 信息 -->
          <div>
            <div class="flex items-center mb-[20px]">
              <div
                class="w-[110px] flex items-center justify-between mr-[10px] text-[#8C8C8C]"
              >
                <Icon icon="uil:bag-alt" />
                <span>工作信息</span>
              </div>
              <p class="w-[100%] h-[1px] border-t-[1px] boeder-[#E8E8E8]"></p>
            </div>
            <div class="h-[50px] laeding-[50px] text-[14px] flex items-center">
              <p class="w-[80px] text-[#8C8C8C]">昵称</p>
              <p>
                {{
                  InformationData?.data.nickname
                    ? InformationData?.data.nickname
                    : "-"
                }}
              </p>
            </div>
            <div class="h-[50px] laeding-[50px] text-[14px] flex items-center">
              <p class="w-[80px] text-[#8C8C8C]">职位</p>
              <p>-</p>
            </div>
            <div class="h-[50px] laeding-[50px] text-[14px] flex items-center">
              <p class="w-[80px] text-[#8C8C8C]">邮箱</p>
              <p>{{ InformationData?.data.email }}</p>
            </div>
            <div class="h-[50px] laeding-[50px] text-[14px] flex items-center">
              <p class="w-[80px] text-[#8C8C8C]">手机</p>
              <p>
                {{
                  InformationData?.data.phone
                    ? InformationData?.data.phone
                    : "-"
                }}
              </p>
            </div>
            <div class="h-[50px] laeding-[50px] text-[14px] flex items-center">
              <p class="w-[80px] text-[#8C8C8C]">部门</p>
              <p>
                {{
                  InformationData?.data.department?.name
                    ? InformationData.data.department.name
                    : "-"
                }}
              </p>
            </div>
            <div class="h-[50px] laeding-[50px] text-[14px] flex items-center">
              <p class="w-[80px] text-[#8C8C8C]">城市</p>
              <p>
                {{
                  InformationData?.data.city ? InformationData?.data.city : "-"
                }}
              </p>
            </div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  departmentInformation,
  departmentName,
  memberDetails,
  EnableProhibit,
  EditingDepartment,
} from "@/service/index";
import { message } from "ant-design-vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";

let titleData = ref(); //侧栏部门名字
let userData = ref(); //侧栏部门数据
let SearchUseInf = ref(); //成员列表数据
// 成员列表
let parameter = ref();
// eslint-disable-next-line no-undef
const UserData = ref<TuserData>();
const userDataFunction = (obj: {
  keyword: string;
  department_id?: number;
  date_after_created?: string;
  state?: number;
}) => {
  departmentInformation(obj).then((res) => {
    UserData.value = res;
    obj.keyword = SearchUseInf.value;
    parameter.value = obj;
  });
};
userDataFunction({ keyword: "" });

// 搜索
const searchUser = () => {
  parameter.value.keyword = SearchUseInf.value;
  userDataFunction(parameter.value);
};

// 部门名称
const { data: dataInformation, run: runDepartmentName } = useRequest(() =>
  departmentName(),
);

// 标题 部门名称 序号
const selectedValue = ref<string>("所有成员");
// eslint-disable-next-line no-undef
const selectedRow = ref<TuserData | null>(null);
const selectedIndex = ref<number | undefined>(undefined);
const showDepartmentValue = (
  value: string,
  // eslint-disable-next-line no-undef
  row?: TuserData,
  index?: number,
) => {
  selectedValue.value = value; //侧栏部门名字
  selectedRow.value = row; //侧栏部门数据
  selectedIndex.value = index; //侧栏部门索引
  titleData.value = selectedValue.value;
  userData.value = selectedRow.value;
};

// 编辑部门input框数据
interface FormState {
  DepartmentNameValue: string;
  sortValue: number;
}
const formState = reactive<FormState>({
  DepartmentNameValue: "",
  sortValue: 0,
});
watchEffect(() => {
  formState.DepartmentNameValue = selectedRow.value?.name || ""; // 如果name为undefined，则设为空字符串
  formState.sortValue = Number(selectedRow.value?.sort) || 0;
});

// //编辑
function EditingDepartmentDataFn(sort: number, name: string) {
  EditingDepartment({
    name: name,
    sort: sort,
    id: userData.value.id,
    owner_id: userData.value.owner_id,
    parent_id: userData.value.parent_id,
    created_at: userData.value.created_at,
    updated_at: userData.value.updated_at,
  }).then((res) => {
    message.info("编辑成功");
    department(false);
    console.log(res);
    runDepartmentName();
    userDataFunction(parameter.value);
    selectedValue.value = name;
    formState.sortValue = sort;
  });
}

// 启动禁用框
const confirm = async (id: number, state: 0 | 1) => {
  await EnableProhibit({ state: state, id: id });
  if (state === 1) {
    message.info("启用成功");
  } else {
    message.info("禁用成功");
  }
  userDataFunction(parameter.value);
};

// // 部门排序
// eslint-disable-next-line no-undef
const DepartmentSorting = ref<TuserData>([]);
const SortFunction = () => {
  DepartmentSorting.value = dataInformation?.value?.data.rows
    ? dataInformation.value.data.rows
        .slice()
        .sort((a: { sort: number }, b: { sort: number }) => b.sort - a.sort)
    : [];
};
// 在组件生命周期中，执行一次排序，并确保 sortedDepartments 响应式地跟踪 dataDepartmentName 的变化
watchEffect(() => {
  SortFunction();
});

// 成员详细信息
// eslint-disable-next-line no-undef
const InformationData = ref<TuserData>();
const InformationFunction = (obj: { id: number }) => {
  memberDetails(obj).then((res) => {
    InformationData.value = res;
  });
};
InformationFunction({ id: 11 });

// 元素的显示隐藏
const showElement = ref(false);
function toggleElement() {
  showElement.value = true;
}
function toggleElementDeny() {
  showElement.value = false;
}

// 组件
const selectedKeys = ref<string[]>(["1"]);
const onCollapse = (collapsed: boolean, type: string) => {
  console.log(collapsed, type);
};

const onBreakpoint = (broken: boolean) => {
  console.log(broken);
};

const modal1Visible = ref<boolean>(false);
const detailedInformation = ref<boolean>(false);
const department = (open: boolean) => {
  modal1Visible.value = open;
};
</script>

<style lang="scss">
.Height {
  height: calc(100vh - 65px);
}
#components-layout-demo-responsive .logo {
  height: 32px;
  margin: 16px;
}
:where(.css-dev-only-do-not-override-eq3tly).ant-layout .ant-layout-sider {
  background-color: #ffffff;
}
.ant-menu-title-content {
  display: flex;
  align-items: center;
}
.EditingDepartmentCss {
  .ant-modal-content {
    padding: 0 !important;
  }
}
.sidebar {
  width: 248px !important;
  max-width: 248px !important;
  min-width: 248px !important;
  .nav-text {
    overflow: hidden;
    width: 160px !important;
    text-overflow: ellipsis;
  }
}
.masking-out {
  padding: 0;
  .ant-modal-footer {
    display: none;
  }
}
.detailedInformation {
  .ant-modal-footer {
    display: none;
  }
}
.prohibit .ant-popconfirm-buttons {
  display: none;
}
.ant-popconfirm-buttons {
  .ant-btn-primary {
    background-color: #1677ff !important;
  }
}
.DepartmentSearchBox {
  .ant-form-item-required {
    height: 40px !important;
  }
  .dynamic_rule_sort {
    height: 40px !important;
  }
}
</style>
