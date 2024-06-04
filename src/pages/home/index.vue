<template>
  <div class="app-contain">
    <div class="head-image"></div>
    <div class="form-contain">
      <div class="titleLogin">登录MOM移动端</div>
      <t-input
        v-model="Login.name"
        label="账号"
        placeholder="请输入账号"
        @blur="GetOrgList"
      >
      </t-input>
      <t-input
        v-model="Login.password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        default-value=""
        :clearable="true"
      ></t-input>
      <t-cell
        arrow
        title="组织"
        class="fs15"
        :note="Login.orgArrLabel.join(' ')"
        @click="changeObjList(true)"
      />
    </div>
    <div style="z-index: 0">
      <t-popup
        v-model="cityState.show"
        class="fs15"
        style="font-size: 25px"
        title="请选择组织"
        placement="bottom"
      >
        <t-picker
          v-model="Login.orgArrValue"
          :columns="orgoptions"
          @confirm="onConfirm"
          @cancel="changeObjList(false)"
          @pick="onPick"
        />
      </t-popup>
      <t-button
        theme="primary"
        size="large"
        block
        class="rectangle-button"
        @click="submitLogin"
        >登录</t-button
      >
    </div>
  </div>
  <t-message
    v-model="msgVisible"
    class="messageInfo"
    :offset="[10, 16]"
    :duration="500000"
    theme="error"
    zIndex="20000"
    :content="msgContent"
  />
</template>

<script lang="ts" setup>
// 引入首页筛选组件
import { Ref, onMounted, reactive, ref } from 'vue';
import { LoginObj, OrgObj } from './types/index';
import {
  reqGet,
  GetUserOrgList,
  LoginGetToken
} from '../../api/login/loginAction';
import { Message } from 'tdesign-mobile-vue';

const showMessage = (
  theme: string,
  content = '这是一条普通通知信息',
  duration = 1000
) => {
  if (Message[theme]) {
    Message[theme]({
      offset: [10, 16],
      content,
      duration,
      icon: true,
      zIndex: 9999,
      context: document.querySelector('.button-demo')
    });
  }
};

const cityState = reactive({
  show: false,
  city: []
});

// 获取用户信息
let Login: Ref<LoginObj> = ref({
  name: '',
  password: '',
  orgID: 0,
  orgArrValue: [],
  orgArrLabel: []
});

const msgVisible = ref(false);
const msgContent = ref('');

const onChange = (val: string) => {
  console.log('change: ', val);
};

const userName = ref('');
const passWord = '';
// const cityState = reactive({
//   show: false,
//   obj: []
// });

let orgoptions: any[] = [];

const GetOrgList = async () => {
  const name = Login.value.name;
  if (!name) return;
  try {
    const res = await GetUserOrgList({ name });
    const response = res.response;
    if (response.length > 0) {
      const row = response[0];
      Login.value.orgArrLabel = [row.name];
      Login.value.orgArrValue = [row.ID];
    }

    const org: any[] = [];
    response.forEach((ele: any) => {
      org.push({
        label: ele.name,
        value: ele.ID
      });
    });

    orgoptions = [org];
  } catch (error: any) {
    msgContent.value = error.message;
    msgVisible.value = true;
  }
};

const changeObjList = (show: boolean) => {
  if (orgoptions.length === 0) {
    return;
  }
  cityState.show = show;
};

const onConfirm = (val: string[], context: any) => {
  Login.value.orgArrValue = val;
  Login.value.orgArrLabel = context.label;
  changeObjList(false);
};

const onPick = (value: [], context: any) => {
  console.log('value', value);
  console.log('context', context);
};

const submitLogin = async () => {
  const orgArrValue = Login.value.orgArrValue;
  if (orgArrValue.length === 0) return;
  Login.value.orgID = orgArrValue[0];
  const ref = await LoginGetToken(Login.value);
  if (ref.success) {
    showMessage('success', '登录成功');
    console.log(ref);
  }
};
</script>

<style lang="less" scoped>
.app-contain {
  width: 100%;
  height: 100%;
  position: relative;
  .head-image {
    width: 100%;
    height: 180px;
    background-image: url(/src/assets/head-bg.png);
    background-size: cover; /* 背景图像填充整个元素 */
    background-repeat: no-repeat; /* 背景图像不重复 */
    background-position: center center; /* 背景图像居中 */
  }
  .titleLogin {
    width: 100%;
    height: 28px;
    opacity: 1;
    color: #000000e6;
    font-size: 20px;
    font-weight: 600;
    font-family: 'PingFang SC';
    text-align: center;
    line-height: 28px;
  }
  .fs15 {
    font-size: 15px;
  }
  .rectangle-button {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
