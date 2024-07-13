<template>
  <div class="app-contain">
    <HomeNav title="中转仓接收" :isGoPrevious="1" pathURL="/location"></HomeNav>
    <!-- <div style="width: 100%; height: 50px">
      <QrcodeReader @decode="onDecode" :debug="false" :captureInterval="500" />
    </div> -->
    <div class="box">
      <t-form
        class="tform"
        ref="form"
        :data="formData"
        reset-type="initial"
        show-error-message
        label-align="left"
      >
        <t-form-item label="出货单号" name="name">
          <t-input
            v-model="formData.vouchCode"
            borderless
            placeholder="请输入出货单号"
            clearable
            :onBlur="onBlurChange"
          >
            <template #suffix>
              <div class="suffix">
                <icon name="scan" />
              </div>
            </template>
          </t-input>
        </t-form-item>
        <t-form-item arrow label="仓库" name="whName" content-align="right">
          <t-input
            v-model="formData.whName"
            borderless
            align="right"
            placeholder="请选择仓库"
            @click="changeWcArr(true)"
          ></t-input>
          <t-popup v-model="stateArr.show" placement="bottom" class="fs15">
            <t-picker
              class="fs20"
              v-model="stateArr.orgArrValue"
              :columns="orgoptions"
              @confirm="onConfirm"
              @cancel="changeWcArr(false)"
              @pick="onPick"
            />
          </t-popup>
        </t-form-item>
      </t-form>
      <t-table
        class="ttable"
        type="radio"
        row-key="ID"
        :data="data"
        :columns="columns"
        :bordered="bordered"
        :show-header="showHeader"
        cell-empty-content="-"
        height="500px"
        @row-click="handleRowClick"
        @cell-click="handleCellClick"
        @scroll="handleScroll"
      >
        <template #type-slot-checkbox="{ col, row, rowIndex }">
          <!-- 自定义单元格 -->
          <div>
            <t-checkbox
              v-model="row.selected"
              icon="rectangle"
              default-checked
              @change="(checked: boolean) => handleRowSelect(row, rowIndex,checked)"
            />
          </div>
        </template>
      </t-table>

      <div class="button-group">
        <t-button
          theme="primary"
          type="submit"
          size="medium"
          class="mg5"
          @click="onSubmit"
          >提交</t-button
        >
        <t-button
          theme="default"
          variant="base"
          type="reset"
          size="medium"
          @click="onReset"
          >重置</t-button
        >
      </div>
    </div>
    <video ref="video" style="display: none"></video>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, h, onBeforeMount } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';
import HomeNav from '../../components/HomeNav.vue';
import QrcodeReader from 'vue3-qrcode-reader';
const scannedResult = ref<string>('');

const onDecode = (content: string) => {
  scannedResult.value = content;
};

import {
  GetMidReciveInfo,
  GetWareHouse,
  ConfirmMidRecive
} from '../../api/GoodsTrans/MidWhReceive';

let formData = reactive({
  vouchCode: '',
  whID: 0,
  whName: '',
  isAllSelected: false // 初始化全选状态
});
let data = ref<any[]>([]);
let orgoptions: any[] = [];
const stateArr = reactive({
  show: false,
  orgArrValue: []
});

let whIDs: any[] = [];
const onConfirm = (val: string[], context: any) => {
  whIDs = val;
  formData.whName = context.label;
  changeWcArr(false);
};

const changeWcArr = (show: boolean) => {
  if (orgoptions.length === 0) {
    return;
  }
  stateArr.show = show;
};
// 获取菜单
const wcOptions = ref<any[]>([]);
const getWareHouse = async () => {
  const ref = await GetWareHouse(null);
  const response = ref.response;
  if (response.length > 0) {
    const row = response[0];
    whIDs = [row.ID];
    formData.whName = row.whName;
  }

  const org: any[] = [];
  response.forEach((ele: any) => {
    org.push({
      label: ele.whName,
      value: ele.ID
    });
  });

  orgoptions = [org];
  // wcOptions.value = ref.response;
  // console.log(ref.response);
};

onMounted(async () => {
  await getWareHouse();
});
const onPick = (value: [], context: any) => {
  console.log('value', value);
  console.log('context', context);
};

// form
const onBlurChange = async (value: string, context: { e: FocusEvent }) => {
  if (!value) return;
  const obj = {
    vouchCode: value
  };
  const ref = await GetMidReciveInfo(obj);
  const response = ref.response;

  const whID = whIDs[0];
  const org: any[] = [];
  response.forEach((ele: any) => {
    org.push({
      ID: ele.ID,
      whID: whID,
      cBatch: ele.cBatch,
      iNum: ele.iNum,
      iQty: ele.iQty,
      invStd: ele.invStd,
      cLev: ele.cLev,
      selected: false // 添加选中状态
    });
  });
  console.log(org);
  data.value = org;
  // console.log(whIDs);
  // console.log(ref);
  // console.log('===onBlurChange', value, context);
};

const onReset = () => {
  data.value = [];
  formData.vouchCode = '';
  console.log('===onReset');
};

const onSubmit = async (e: any) => {
  const vouchCode = formData.vouchCode;
  const ref = await ConfirmMidRecive(data, vouchCode);
  onReset();
  console.log('===onSubmit', e);
};

const columns = ref([
  {
    colKey: 'checkbox',
    title: () => {
      return h('div', {
        class: formData.isAllSelected ? 'checkedList' : 'uncheckedList',
        onClick: () => {
          toggleSelectAll(!formData.isAllSelected);
        }
      });
    },
    width: 60,
    // 这里定义了自定义单元格内容
    cell: 'type-slot-checkbox'
  },
  { colKey: 'cBatch', title: '卷号', ellipsis: true },
  { colKey: 'iNum', title: '重量', ellipsis: true },
  { colKey: 'iQty', title: '米数', ellipsis: true },
  { colKey: 'invStd', title: '规格', ellipsis: true },
  { colKey: 'cLev', title: '等级', ellipsis: true }
]);

const showHeader = ref(true);
const bordered = ref(true);
const handleScroll = (e: any) => {
  console.log('scroll=====', e);
};
const handleCellClick = (e: any) => {
  console.log('cell-cliek=====', e);
};

// 用于全选/全消的函数
const toggleSelectAll = (isAllSelected: boolean) => {
  console.log(isAllSelected, 'isAllSelected');
  formData.isAllSelected = isAllSelected;
  data.value.forEach((row) => {
    row.selected = isAllSelected;
  });
};

// 用于处理单行选择的函数
const handleRowSelect = (row,rowIndex, checked) => {
  console.log(row, rowIndex, checked);
  data.value[rowIndex].selected = checked;
};
const handleRowClick = (row: any, event: any) => {
  // console.log('row-cliek=====', e);
  data.value.forEach((item, index) => {
    if (index === row.index) {
      item.selected = true; // 设置当前行为选中状态
    } else {
      item.selected = false; // 取消其他行的选中状态
    }
  });
};
</script>
<style lang="less" scoped>
.app-contain {
  width: 100%;
  height: 100%;
  font-size: 15px;
  position: relative;
  .box {
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: auto;
    .tform {
      width: 96%;
      margin: 0 auto;
      // margin-top: 10px;
    }
    .button-group {
      width: 96%;
      margin: 0 auto;
      margin-top: 10px;
    }
    .mg5 {
      margin-right: 5px;
    }
    .suffix {
      font-size: 30px;
      color: #2198e7;
    }
  }
  .ttable {
    width: 96%;
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid gainsboro;
    border-radius: 5px;
  }
}
.fs15 {
  font-size: 15px;
}
.fs20 {
  font-size: 20px;
}
</style>
