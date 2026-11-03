---
date: 2025-04-25
---

# Dynamic Homepage Configuration

[New DOM Operations](/en/archive/computer-science/frontend/engineering-practice/new-dom-operations)

[Main Page Logic](/en/archive/computer-science/frontend/engineering-practice/main-page-logic)

# The indexConfig Folder

This folder holds the comprehensive management backend of the dynamic homepage.

## Basic Logic

1. index.vue
    
    It is a Vue 3 component whose main function is to display a tabbed interface, allowing users to switch between the "System Introduction" and "Business Segments" tabs.
    
2. applicationLink.vue
    
    This file is mainly used to manage application links, including listing, creating, editing, and deleting application links.
    
3. systemDesc.vue
    
    This file is mainly used to manage system descriptions, including listing, creating, and editing system descriptions.
    
4. businessPlate.vue
    
    This file is mainly used to manage business segments, including listing, creating, editing, and deleting business segments.
    

## Code Analysis

### index.vue

```html
<template>
  <el-card class="indexConfig-container">
    <!-- 标签页组件，通过 v-model 绑定当前激活的标签 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <!-- 使用 v-for 动态生成标签页 -->
      <el-tab-pane
          v-for="[key, tab] in Object.entries(TAB_OPTIONS)"
          :key="key"
          :label="tab.label"
          :name="tab.key"
      >
        <!-- 根据当前激活的标签，动态渲染对应的组件 -->
        <component :is="tab.component" v-if="activeName === tab.key" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
```

```html
<script setup>
// 导入 Vue 的 ref 函数
import { ref } from "vue";
// 导入自定义组件
import SystemDesc from "./systemDesc.vue";
import BusinessPlate from "./businessPlate.vue";

// 定义标签页选项配置
const TAB_OPTIONS = {
  SYSTEM_DESC: {
    label: "系统介绍",
    key: "system-desc",
    component: SystemDesc,
  },
  BUSINESS_PLATE: {
    label: "业务板块",
    key: "business-plate",
    component: BusinessPlate,
  },
};

// 使用 ref 定义响应式变量，初始激活的标签为“系统介绍”
const activeName = ref(TAB_OPTIONS.SYSTEM_DESC.key);
</script>
```

```html
<style scoped lang="scss">
.indexConfig-container {
  // 设置左右外边距
  margin-left: 20px;
  margin-right: 20px;
  // 设置容器高度为视口高度减去 200px
  height: calc(100vh - 200px);
}
</style>
```

### applicationLink.vue

```html
<template>
  <!-- 应用链接列表对话框 -->
  <el-dialog v-model="visibleLink" :title="businessItem.name + ' - 应用链接'" custom-class="application-link-table-dialog">
    <div class="appUser_top">
      <!-- 新建应用链接按钮 -->
      <el-button type="primary" @click="addApplicationLink"> 新 建 </el-button>
    </div>
    <div class="content el-card" style="margin-top: 20px;">
      <!-- 自定义表格组件，用于展示应用链接列表 -->
      <TableComponent
          ref="tableRef"
          :table-list="state.tableData"
          :options-button="optionButton"
          :table-column-info="ApplicationLinkList"
          @defaultPageData="getDefaultPage"
          @updateData="setPageInfo"
          :options-width="180"
      >
      </TableComponent>
    </div>
    <template #footer>
      <!-- 关闭列表对话框按钮 -->
      <span>
        <el-button @click="visibleLink = false">取 消</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 新建或编辑应用链接对话框 -->
  <el-dialog v-model="visible" :title="isAdd === 'add' ? '新建': '修改'" custom-class="application-link-dialog">
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="m-auto mt-1"
    >
      <!-- 关联应用选择框 -->
      <el-form-item label="关联应用" prop="applicationID">
        <el-select
            v-model="form.applicationID"
            @change="appIDChange"
            clearable
            filterable
            style="width: 100%">
          <el-option
              v-for="item in applicationList"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 应用名称输入框 -->
      <el-form-item label="应用名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!-- 应用链接输入框 -->
      <el-form-item label="应用链接" prop="link">
        <el-input type="textarea" :rows="4" v-model="form.link"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <!-- 关闭和确认表单操作按钮 -->
      <span>
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditBusinessPlate"> 确 定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
```

```html
<script setup>
// 导入所需组件和函数
import TableComponent from "@/components/table/TableComponent.vue";
import {onMounted, onUnmounted, reactive, ref, shallowReactive, watch} from "vue";
import { setObjectValue, xtend} from "@/utils/common";
import {instanceToPlain} from "class-transformer";
import { getApplicationLinkApi, delApplicationLinkApi, addApplicationLinkApi, updateApplicationLinkApi } from "@/api/indexConfig";
import {ApplicationLinkList} from "@/view/superAdmin/defaultConfig";
import { ElMessage, ElMessageBox } from "element-plus";
import {emitter} from "@/utils/bus";
import {get} from "@/api";
import {setHTMLSize} from "../../../utils/rem";

// 定义响应式数据
const state = shallowReactive({
  tableData: []
});
let businessItem = {};

// 表格分页相关
const tableRef = ref(null);
const pageInfo = ref(null);

// 表单相关
const isAdd = ref('');
const visibleLink = ref(false);
const visible = ref(false);
const formRef = ref(null);
const form = reactive({
  applicationID: null,
  name: '',
  link: ''
});

// 表单验证规则
let rules = {
  name: [{ required: true, message: '应用名称不能为空', trigger: 'blur' }]
};

// 关联应用列表
const applicationList = ref([]);

// 获取应用链接列表
const getApplicationLink = async () => {
  const res = await getApplicationLinkApi(businessItem.ID, {});
  state.tableData = res.data || [];
  tableRef.value.setPageInfo({ total: res.data.length, page: 1, pageSize: 9999 });
}

// 设置分页信息并重新获取数据
const setPageInfo = arg => {
  pageInfo.value = arg;
  getApplicationLink();
};

// 初始化页数据
const getDefaultPage = page => {
  pageInfo.value = page;
};

// 表格操作列按钮配置
const optionButton = [
  {
    link: true,
    type: 'warning',
    name: '编辑',
    click: arg => {
      isAdd.value = 'edit';
      visible.value = true;
      setObjectValue(form, arg);
      form.id = arg.id;
      if (!form.applicationID) {
        form.applicationID = null;
      }
    },
  },
  {
    link: true,
    type: 'danger',
    name: '删除',
    click: arg => {
      ElMessageBox.confirm(`删除应用链接 【${arg.name}】  ，删除后将不可恢复！`, '删除应用链接', {
        confirmButtonText: '删 除',
        cancelButtonText: '取 消',
        type: 'warning',
        center: true,
        customClass: 'delMessageBox',
        confirmButtonClass: 'delButtonClass',
      }).then(async () => {
        delApplicationLinkApi(businessItem.ID, arg.id).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`删除成功!`);
            getApplicationLink();
          }
        });
      });
    },
  },
];

// 新建应用链接
const addApplicationLink = () =>{
  isAdd.value = 'add';
  visible.value = true;
}

// 关联应用 ID 变化时更新表单数据
const appIDChange = () =>{
  if(form.applicationID) {
    for(let i = 0;i < applicationList.value.length;i++) {
      if (applicationList.value[i].ID === form.applicationID) {
        form.name = applicationList.value[i].name;
        form.link = applicationList.value[i].callbackAddress;
        break;
      }
    }
  } else {
    form.name = '';
    form.link = '';
  }
}

// 确认新建或编辑操作
const addOrEditBusinessPlate = () => {
  formRef.value?.validate(async valid => {
    if (valid) {
      if (isAdd.value === 'add') {
        if(!form.applicationID) {
          delete form.applicationID;
        }
        addApplicationLinkApi(businessItem.ID, form).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`${res.msg}`);
            visible.value = false;
            getApplicationLink();
          }
        });
      } else {
        if(!form.applicationID) {
          delete form.applicationID;
        }
        updateApplicationLinkApi(businessItem.ID, form.id, form).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`${res.msg}`);
            visible.value = false;
            getApplicationLink();
          }
        });
      }
    }
  });
};

// 打开应用链接列表对话框
const openApplicationLinkDialog = (item) =>{
  visibleLink.value = true;
  businessItem = item;
  getApplicationLink();
}

// 监听表单对话框显示状态
watch(
    visible,
    async () => {
      if (!visible.value) {
        form.applicationID = '';
        form.name = '';
        form.link = '';
      } else {
        let res = await get(
            {
              page: 1,
              pageSize: 9999
            },
            "/general/app/"
        );
        applicationList.value = res.data?.list;
      }
    },
    { immediate: false },
);

// 监听事件总线的消息
emitter.on('application-link', openApplicationLinkDialog);

// 组件挂载时执行
onMounted(() =>{
  // 此处无具体逻辑
})

// 组件卸载时移除事件监听
onUnmounted(() =>{
  emitter.off('application-link', openApplicationLinkDialog);
})
</script>
```

```html
<style lang="scss" scoped>
// 隐藏分页组件
:deep(.paginationclass) {
  display: none;
}

// 应用链接列表对话框样式
:deep(.application-link-table-dialog) {
  width: 960px;
  .content {
    height: 460px;
  }
}

// 新建或编辑应用链接对话框样式
:deep(.application-link-dialog) {
  width: 560px;
  .el-form {
    max-width: 460px;
    .el-form-item__label {
      width: 100px;
    }
  }
}
</style>
```

### systemDesc.vue

```html
<template>
  <div>
    <!-- 顶部操作栏，包含新建按钮 -->
    <div class="appUser_top">
      <el-button type="primary" @click="addSystemDesc"> 新 建 </el-button>
    </div>
    <!-- 表格展示区域 -->
    <div class="mainHeight content el-card el-card__body">
      <TableComponent
          ref="tableRef"
          :table-list="state.tableData"
          :options-button="optionButton"
          :table-column-info="SystemDescList"
          @defaultPageData="getDefaultPage"
          @updateData="setPageInfo"
          :options-width="180"
      >
        <!-- 自定义 `isEnabled` 列，使用开关组件 -->
        <template #isEnabled="{ data }">
          <el-switch v-model="data.isEnabled" @change="isEnabledChange(data)"/>
        </template>
        <!-- 自定义 `image` 列，展示图片 -->
        <template #image="{ data }">
          <img :src="data.image ? simulationCover(data.image) :''" alt="" style="width: 192px;">
        </template>
      </TableComponent>
    </div>

    <!-- 新建或编辑对话框 -->
    <el-dialog v-model="visible" :title="isAdd === 'add' ? '新建': '修改'" custom-class="system-desc-dialog">
      <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="m-auto mt-1"
      >
        <!-- 描述输入框 -->
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" :rows="9" v-model="form.description" :maxlength="186" show-word-limit></el-input>
        </el-form-item>
        <!-- 轮播图上传组件 -->
        <el-form-item label="轮播图" prop="favicon">
          <el-upload
              action="#"
              v-model:file-list="fileList"
              ref="uploadRef"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="submitUpload"
          >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
              />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-delete" @click="handleRemove">
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </template>
          </el-upload>
        </el-form-item>
        <!-- 跳转链接输入框 -->
        <el-form-item label="跳转链接" prop="link">
          <el-input type="textarea" :rows="2" v-model="form.link"></el-input>
        </el-form-item>
        <!-- 是否启用开关 -->
        <el-form-item label="是否启用" prop="isEnabled">
          <el-switch v-model="form.isEnabled"/>
        </el-form-item>
      </el-form>
      <!-- 对话框底部操作按钮 -->
      <template #footer>
        <span>
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="addOrEditSystemDesc"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
```

```html
<script setup>
// 导入组件和函数
import TableComponent from "@/components/table/TableComponent.vue";
import {onMounted, reactive, ref, shallowReactive, watch} from "vue";
import {setObjectValue, xtend} from "@/utils/common";
import {instanceToPlain} from "class-transformer";
import {addSystemDescApi, delSystemDescApi, getSystemDescApi, updateSystemDescApi} from "@/api/indexConfig";
import {simulationCover, SystemDescList} from "@/view/superAdmin/defaultConfig";
import {ElMessage, ElMessageBox} from "element-plus";
import {Delete, Plus} from "@element-plus/icons-vue";
import {uploadFile} from "@/api/user";

// 定义响应式数据
// 表格数据
const state = shallowReactive({
  tableData: []
});
// 表格引用和分页信息
const tableRef = ref(null);
const pageInfo = ref(null);
// 表单相关数据
const isAdd = ref('');
const visible = ref(false);
const formRef = ref(null);
const form = reactive({
  description: '',
  isEnabled: false,
  image: '',
  link: ''
});
// 表单验证规则
let rules = {
  description: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
};
// 文件列表和上传组件引用
const fileList = ref([]);
const uploadRef = ref();

// 处理文件上传
const handleUploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);
  try {
    const res = await uploadFile(data);
    form.image = res.data.file_path;
  } catch (error) {}
};

// 提交文件上传
const submitUpload = (file) => {
  fileList.value = [file];
  handleUploadFile(file.raw);
};

// 处理文件移除
const handleRemove = () => {
  uploadRef.value.clearFiles();
  form.headerImg = "";
};

// 获取系统介绍列表
const getSystemDesc = async () => {
  const searchInfo = xtend(instanceToPlain(pageInfo.value));
  const {
    data: {list, page, pageSize, total},
  } = await getSystemDescApi(searchInfo);
  state.tableData = list || [];
  tableRef.value.setPageInfo({page, pageSize, total});
};

// 设置分页信息并重新获取数据
const setPageInfo = arg => {
  pageInfo.value = arg;
  getSystemDesc();
};

// 初始化页数据
const getDefaultPage = page => {
  pageInfo.value = page;
};

// 表格操作列按钮配置
const optionButton = [
  {
    link: true,
    type: 'warning',
    name: '编辑',
    click: arg => {
      isAdd.value = 'edit';
      visible.value = true;
      setObjectValue(form, arg);
      form.ID = arg.ID;
    },
  },
  {
    link: true,
    type: 'danger',
    name: '删除',
    click: arg => {
      ElMessageBox.confirm(`删除系统介绍 【${arg.description}】  ，删除后将不可恢复！`, '删除系统介绍', {
        confirmButtonText: '删 除',
        cancelButtonText: '取 消',
        type: 'warning',
        center: true,
        customClass: 'delMessageBox',
        confirmButtonClass: 'delButtonClass',
      }).then(async () => {
        delSystemDescApi(arg.ID).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`删除成功!`);
            getSystemDesc();
          }
        });
      });
    },
  },
];

// 新建系统介绍
const addSystemDesc = () =>{
  isAdd.value = 'add';
  visible.value = true;
};

// 修改启用状态
const isEnabledChange = (arg) =>{
  updateSystemDescApi(arg.ID, arg).then(res => {
    if (!(res instanceof Error)) {
      ElMessage.success(`${res.msg}`);
      visible.value = false;
      getSystemDesc();
    }
  });
};

// 确认新建或编辑操作
const addOrEditSystemDesc = () => {
  formRef.value?.validate(async valid => {
    if (valid) {
      if (isAdd.value === 'add') {
        addSystemDescApi(form).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`${res.msg}`);
            visible.value = false;
            getSystemDesc();
          }
        });
      } else {
        updateSystemDescApi(form.ID, form).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`${res.msg}`);
            visible.value = false;
            getSystemDesc();
          }
        });
      }
    }
  });
};

// 监听对话框显示、隐藏，隐藏时重置表单
watch(
    visible,
    () => {
      if (!visible.value) {
        form.description = '';
        form.isEnabled = false;
        fileList.value = [];
      }
    },
    { immediate: false },
);

// 组件挂载时获取系统介绍列表
onMounted(() =>{
  getSystemDesc();
})
</script>
```

```html
<style lang="scss" scoped>
:deep(.system-desc-dialog) {
  width: 560px;
  .el-form {
    max-width: 460px;
    .el-form-item__label {
      width: 100px;
    }
  }
}
</style>
```

### businessPlate.vue

```html
<template>
  <div>
    <!-- 顶部操作栏，新建按钮被注释 -->
    <div class="appUser_top">
<!--      <el-button type="primary" @click="addBusinessPlate"> 新 建 </el-button>-->
    </div>
    <!-- 表格展示区域 -->
    <div class="mainHeight content el-card el-card__body">
      <TableComponent
          ref="tableRef"
          :table-list="state.tableData"
          :options-button="optionButton"
          :table-column-info="BusinessPlateList"
          @defaultPageData="getDefaultPage"
          @updateData="setPageInfo"
          :options-width="240"
      >
      </TableComponent>
    </div>

    <!-- 新建或编辑对话框 -->
    <el-dialog v-model="visible" :title="isAdd === 'add' ? '新建': '修改'" custom-class="business-plate-dialog">
      <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          class="m-auto mt-1"
      >
        <!-- 业务板块名称输入框 -->
        <el-form-item label="业务板块" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 简介输入框 -->
        <el-form-item label="简介" prop="introduction">
          <el-input type="textarea" :rows="2" v-model="form.introduction" :maxlength="15" show-word-limit></el-input>
        </el-form-item>
        <!-- 描述输入框 -->
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" :rows="6" v-model="form.description" :maxlength="120" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部操作按钮 -->
      <template #footer>
        <span>
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="addOrEditBusinessPlate"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 引入应用链接组件 -->
    <ApplicationLink></ApplicationLink>
  </div>
</template>
```

```html
<script setup>
// 导入所需组件和函数
import TableComponent from "@/components/table/TableComponent.vue";
import {onMounted, reactive, ref, shallowReactive, watch} from "vue";
import { setObjectValue, xtend} from "@/utils/common";
import {instanceToPlain} from "class-transformer";
import { getBusinessPlateApi, delBusinessPlateApi, addBusinessPlateApi, updateBusinessPlateApi } from "@/api/indexConfig";
import { BusinessPlateList} from "@/view/superAdmin/defaultConfig";
import { ElMessage, ElMessageBox } from "element-plus";
import ApplicationLink from '@/view/superAdmin/indexConfig/applicationLink.vue';
import {emitter} from "@/utils/bus";

// 定义响应式数据
// 表格数据
const state = shallowReactive({
  tableData: []
});
// 表格引用和分页信息
const tableRef = ref(null);
const pageInfo = ref(null);
// 表单相关数据
const isAdd = ref('');
const visible = ref(false);
const formRef = ref(null);
const form = reactive({
  name: '',
  description: '',
  introduction: '',
});
// 表单验证规则
let rules = {
  name: [{ required: true, message: '业务板块不能为空', trigger: 'blur' }]
};

// 获取业务板块列表
const getBusinessPlate = async () => {
  const searchInfo = xtend(instanceToPlain(pageInfo.value));
  const {
    data: {list, page, pageSize, total},
  } = await getBusinessPlateApi(searchInfo);
  state.tableData = list || [];
  tableRef.value.setPageInfo({page, pageSize, total});
}

// 设置分页信息并重新获取数据
const setPageInfo = arg => {
  pageInfo.value = arg;
  getBusinessPlate();
};

// 初始化页数据
const getDefaultPage = page => {
  pageInfo.value = page;
};

// 表格操作列按钮配置
const optionButton = [
  {
    link: true,
    type: 'primary',
    name: '应用链接',
    click: arg => {
      emitter.emit('application-link', arg);
    },
  },
  {
    link: true,
    type: 'warning',
    name: '编辑',
    click: arg => {
      isAdd.value = 'edit';
      visible.value = true;
      setObjectValue(form, arg);
      form.ID = arg.ID;
    },
  },
  // 删除按钮被注释
  // {
  //   link: true,
  //   type: 'danger',
  //   name: '删除',
  //   click: arg => {
  //     ElMessageBox.confirm(`删除业务板块 【${arg.description}】  ，删除后将不可恢复！`, '删除业务板块', {
  //       confirmButtonText: '删 除',
  //       cancelButtonText: '取 消',
  //       type: 'warning',
  //       center: true,
  //       customClass: 'delMessageBox',
  //       confirmButtonClass: 'delButtonClass',
  //     }).then(async () => {
  //       delBusinessPlateApi(arg.ID).then(res => {
  //         if (!(res instanceof Error)) {
  //           ElMessage.success(`删除成功!`);
  //           getBusinessPlate();
  //         }
  //       });
  //     });
  //   },
  // },
];

// 新建业务板块
const addBusinessPlate = () =>{
  isAdd.value = 'add';
  visible.value = true;
}

// 确认新建或编辑操作
const addOrEditBusinessPlate = () => {
  formRef.value?.validate(async valid => {
    if (valid) {
      if (isAdd.value === 'add') {
        addBusinessPlateApi(form).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`${res.msg}`);
            visible.value = false;
            getBusinessPlate();
          }
        });
      } else {
        updateBusinessPlateApi(form.ID, form).then(res => {
          if (!(res instanceof Error)) {
            ElMessage.success(`${res.msg}`);
            visible.value = false;
            getBusinessPlate();
          }
        });
      }
    }
  });
};

// 监听对话框显示、隐藏，隐藏时重置表单
watch(
    visible,
    () => {
      if (!visible.value) {
        form.name = '';
        form.description = '';
        form.introduction = '';
      }
    },
    { immediate: false },
);

// 组件挂载时获取业务板块列表
onMounted(() =>{
  getBusinessPlate();
})
</script>
```

```html
<style lang="scss" scoped>
:deep(.business-plate-dialog) {
  width: 560px;
  .el-form {
    max-width: 460px;
    .el-form-item__label {
      width: 80px;
    }
  }
}
</style>
```

# The zgIndex.vue Folder

It contains only a single index.vue file.

## Basic Logic

Judging from the code, this is a Vue 3 single-file component that serves as the homepage of the entire system. The following is an analysis of its basic logic:

1. **Page structure**:
    - A fixed navigation bar at the top (`zg-index-header`)
    - A carousel area in the middle (`zg-index-banner`)
    - Below it, four main business segments:
        - Talent Development
        - Cross-Domain Connectivity
        - Vulnerability Discovery
        - Security Testing
    - Footer information at the bottom
2. **Core functional logic**:
    - **Data retrieval**: In the `onMounted` lifecycle hook, the system description (`getSystemDescFilterApi`) and business segment details (`getBusinessPlateDetailApi`) are fetched through APIs.
    - **Access control**: The `sso_token` in the cookie is checked to determine the user's login status, and the user's permissions (`userApps`) control access to the different feature modules.
    - **Navigation interaction**:
        - The top navigation bar has search and a user avatar dropdown menu.
        - The middle area has anchor navigation; clicking it smoothly scrolls to the corresponding segment.
        - Each business segment has a hover effect and click-through navigation.
3. **Main business logic**:
    - **Talent Development**: Displays 5 sub-modules (training and teaching, competitive practice, etc.), with access controlled by permissions.
    - **Cross-Domain Connectivity**: Displays the system description and a "view details" entry.
    - **Vulnerability Discovery**: Displays entries to 4 security systems.
    - **Security Testing**: Displays entries to 11 security testing tools.

As the system portal, this page integrates the entry points of the main business areas and provides a good user experience through dynamic data presentation and access control.

## Code Analysis

### index.vue

The following is only a rough analysis, because this page has far too many characters.

```html
<script setup>
// 1. 导入资源部分
// 导入各种图片资源和组件
import talentIcon from '@/assets/datang/banner-talent.png';
import crossIcon from '@/assets/datang/banner-cross.png';
// ...其他图片导入
import { onMounted, onUnmounted, ref } from "vue";
import Search from "@/view/layout/search/search.vue";
// ...其他组件导入

// 2. 路由和状态管理
const router = useRouter();
const userStore = useUserStore()

// 3. 页面数据定义部分
// 顶部导航栏引用
const zgIndexHeaderRef = ref();

// 页面基础信息
const infoData = ref(DATAINFO);

// 轮播图数据
const baseInfoArr = ref([]);

// 4. 业务板块数据定义
// 顶部导航按钮数据
const bannerArr = ref([
  { name: '人才培养', desc: '', href: '#talentId', icon: talentIcon },
  // ...其他导航项
]);

// 人才培养模块数据
const trainArr = ref([
  { name: '培训教学', desc: '', href: `#`, icon: trainIcon, iconActive: trainIconActive },
  // ...其他子项
])

// 5. 交互逻辑部分
// 人才培养模块hover效果
const talentHover = (index, item) => {
  // ...权限判断逻辑
  talentCurrentIndex.value = index;
}

// 锚点滚动功能
const scrollToSection = (href) => {
  // ...滚动实现
}

// 6. 生命周期钩子
onMounted(() => {
  // 初始化逻辑
  // 获取用户信息
  // 获取系统介绍数据
  // 获取业务板块详情
})

// 7. 工具函数
// 数组匹配替换工具
const matchArrItemReplace = (sourceArr, matchField, matchStr, replaceField, replaceStr) => {
  // ...实现逻辑
}
</script>

<template>
  <!-- 1. 顶部导航栏 -->
  <div class="zg-index-header">
    <!-- ...导航栏内容 -->
  </div>

  <!-- 2. 轮播图区域 -->
  <div class="zg-index-banner">
    <!-- ...轮播图内容 -->
  </div>

  <!-- 3. 人才培养板块 -->
  <div class="zg-index-talent-cultivation" id="talentId">
    <!-- ...人才培养内容 -->
  </div>

  <!-- 4. 跨域互联板块 -->
  <div class="zg-index-cross-domain" id="crossId">
    <!-- ...跨域互联内容 -->
  </div>

  <!-- 5. 漏洞挖掘板块 -->
  <div class="zg-index-vulnerability-exploration" id="vulnerabilityIId">
    <!-- ...漏洞挖掘内容 -->
  </div>

  <!-- 6. 安全测试板块 -->
  <div class="zg-index-security-testing" id="securityId">
    <!-- ...安全测试内容 -->
  </div>

  <!-- 7. 页脚 -->
  <div class="zg-index-footer">
    <!-- ...页脚内容 -->
  </div>
</template>

<style scoped lang="scss">
/* 1. 整体容器样式 */
.zg-index-container {
  /* ... */
}

/* 2. 顶部导航栏样式 */
.zg-index-header {
  /* ... */
}

/* 3. 轮播图区域样式 */
.zg-index-banner {
  /* ... */
}

/* 4. 各业务板块公共样式 */
.zg-index-title-container {
  /* 标题统一样式 */
}

/* 5. 人才培养板块特定样式 */
.zg-index-talent-cultivation {
  /* ... */
}

/* 6. 其他业务板块样式... */
</style>
```

# How the Two Pages Share Data

The `indexConfig` folder and `zgIndex.vue` are connected mainly through API calls. The specific relationships are as follows:

1. **API definitions** (`src\api\indexConfig`):
    
    index.js file:
    
    ```jsx
    // 定义获取业务板块详情的API
    export const getBusinessPlateDetailApi = () => {
      return request({
        url: '/general/system/businessPlate/detail',
        method: 'get'
      })
    }
    
    // 定义获取系统介绍的API
    export const getSystemDescFilterApi = () => {
      return request({
        url: '/general/system/desc/filter',
        method: 'get'
      })
    }
    ```
    
2. **Component usage** (`src\view\zgIndex`):
    
    index.vue
    
    ```jsx
    // 导入API
    import { getBusinessPlateDetailApi, getSystemDescFilterApi } from "@/api/indexConfig";
    
    // 在onMounted生命周期中调用
    onMounted(() => {
      // 获取系统介绍
      getSystemDescFilterApi().then(res => {
        // 处理返回数据...
      });
    
      // 获取业务板块详情
      getBusinessPlateDetailApi().then(res => {
        // 处理返回数据...
      });
    })
    ```
    
3. **Data flow relationships**:
    - As the homepage component, `zgIndex.vue` retrieves the configuration data by calling the APIs defined in `indexConfig`.
    - The retrieved data is used to render:
        - Carousel content (baseInfoArr)
        - Information for the four business segments (Talent Development / Cross-Domain Connectivity / Vulnerability Discovery / Security Testing)
        - Sub-module links under each segment
4. **Feature implementation**:
    - `indexConfig` provides an abstraction layer over the backend interfaces.
    - `zgIndex.vue` is responsible for data retrieval and UI rendering.
    - Shared state (such as user permission information) is managed through Pinia/Vuex.

This design follows the principle of separating the frontend from the backend, decoupling the retrieval of configuration data from UI rendering, which makes the system easier to maintain and extend.
