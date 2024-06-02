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
    </div>
    <div style="z-index: 0">
      <div class="placeholder"></div>
      <t-input
        v-model="passWord"
        label="密码"
        type="password"
        default-value=""
        :clearable="false"
      ></t-input>
      <t-cell
        arrow
        title="组织"
        style="font-size: 16px"
        :note="cityState.city.join(' ')"
        @click="cityState.show = true"
      />
      <t-popup v-model="cityState.show" placement="bottom">
        <t-picker
          v-model="cityState.city"
          :columns="cityOptions"
          @confirm="onConfirm"
          @cancel="cityState.show = true"
          @pick="onPick"
        />
      </t-popup>

      <div class="placeholder"></div>

      <t-button theme="primary" size="large" block class="rectangle-button"
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
import { reqGet, GetUserOrgList } from '../../api/login/loginAction';
import { Message } from 'tdesign-mobile-vue';

// 获取用户信息
let Login: Ref<LoginObj> = ref({
  name: '',
  password: '',
  orgID: 0
});

const msgVisible = ref(false);
const msgContent = ref('');

const onChange = (val: string) => {
  console.log('change: ', val);
};

const userName = ref('');
const passWord = '';
const org: any[] = [];
const cityState = reactive({
  show: false,
  city: []
});
const cityOptions = [
  [
    // {
    //   label: '北京市',
    //   value: '北京市',
    // }
  ]
];

const GetOrgList = async () => {
  const name = Login.value.name;
  if (!name) return;
  try {
    const res = await GetUserOrgList({ name });
    // const response = res.response;

    console.log('res', res);
  } catch (error: any) {
    msgContent.value = error.message;
    msgVisible.value = true;
  }
};

const onConfirm = (val: string[], context: number[]) => {
  console.log(val);
  console.log('context', context);
  cityState.show = false;
};

const onPick = (value: [], context: any) => {
  console.log('value', value);
  console.log('context', context);
};

//标签栏
const tabValue = ref('label_1');
const tabList = ref([
  { value: 'label_1', label: '首页', icon: 'home', path: '/' },
  { value: 'label_2', label: '我的', icon: 'user', path: '/my' }
]);

//活动跳转
const currentTab = ref('first');
const switchTab = (value: string) => {
  currentTab.value = value;
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
    width: 300px;
    height: 28px;
    opacity: 1;
    color: #000000e6;
    font-size: 20px;
    font-weight: 600;
    font-family: 'PingFang SC';
    text-align: left;
    line-height: 28px;
  }
}
</style>
