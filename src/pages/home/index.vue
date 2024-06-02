<template>
    <div>
      <div style="width: 375px; height: 163px">
        <img
          :src="imgSrc"
          style="width: 375px; height: 163px; position: fixed; top: 0"
        />
      </div>
      <div
        class="header"
        style="
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 16px;
          margin-top: 60px;
        "
      >
      </div>
      <div style="z-index: 0">
        <div
          class="titleLogin"
          style="font-size: 20px; margin-left: 16px; z-index: 1"
        >
          登录MOM移动端
        </div>
        <div class="placeholder"></div>
        <t-input v-model="userName" label="账号" placeholder="" @blur="GetOrgList">
        </t-input>
        <t-input v-model="passWord" label="密码" type="password" default-value="" :clearable="false"></t-input>
        <t-cell arrow title="组织" style="font-size:16px" :note="cityState.city.join(' ')" @click="cityState.show = true" />
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
  
        <t-button theme="primary" size="large" block class="rectangle-button">登录</t-button>
      </div>
      
      <!--<t-tab-bar
        class="bottom-tab-bar"
        v-model="tabValue"
        theme="tag"
        :split="false"
      >
        <t-tab-bar-item
          v-for="item in tabList"
          :key="item.value"
          :value="item.value"
          @click="handleTabClick(item.value)"
        >
          {{ item.label }}
          <template #icon>
            <t-icon :name="item.icon" />
          </template>
        </t-tab-bar-item>
      </t-tab-bar>-->
    </div>
    <t-message v-model="msgVisible" class="messageInfo" :offset="[10, 16]" :duration="500000" theme="error" zIndex="20000" :content="msgContent" />
  </template>
  
  <script lang="ts" setup>
  // import { IconFont } from 'tdesign-icons-vue-next';
  import { useRouter } from 'vue-router';
  // import LatestActivity from './LatestActivities.vue';
  // import HighScoreActivity from './HighScoreActivities.vue';
  // 引入首页筛选组件
  // import Filter from '../filter/filter.vue';
  //import { Icon as TIcon } from 'tdesign-icons-vue-next';
  import { onMounted, reactive, ref } from 'vue';
  import { reqGet } from '../../api/login/loginAction.ts';
  import { Message } from 'tdesign-mobile-vue';
  
  const msgVisible = ref(false);
  const msgContent = ref('')
  
  const onChange = (val: string) => {
    console.log('change: ', val);
  };
  
  const userName = ref('');
  const passWord = '';
  const org: any[] = [];
  const cityState = reactive({
    show: false,
    city: [],
  });
  const cityOptions = [
    [
      // {
      //   label: '北京市',
      //   value: '北京市',
      // }
    ],
  ];
  
  const GetOrgList = async (val: string, context: FocusEvent) => {
    if(!userName.value){
      return;
    }
    try{
      const res = await reqGet('/api/Login/GetUserOrgList?name=' + (userName.value || ''));
      console.log("res",res);
    }
    catch (error: any) {
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
  
  const value = ref('');
  
  const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
  const swiperList = [
    `${imageCdn}/swiper1.png`,
    `${imageCdn}/swiper2.png`,
    `${imageCdn}/swiper1.png`,
    `${imageCdn}/swiper2.png`,
    `${imageCdn}/swiper1.png`
  ];
  //标签栏
  const tabValue = ref('label_1');
  const tabList = ref([
    { value: 'label_1', label: '首页', icon: 'home', path: '/' },
    { value: 'label_2', label: '我的', icon: 'user', path: '/my' }
  ]);
  //标签栏跳转
  const router = useRouter();
  const handleTabClick = (value: string) => {
    if (value === 'label_1') {
      router.push('/');
      //console.log('1')
    } else if (value === 'label_2') {
      router.push('/admin');
      //console.log('2')
    }
  };
  //活动跳转
  const currentTab = ref('first');
  const switchTab = (value: string) => {
    currentTab.value = value;
  };
  // 头部背景
  const imgUrl = import.meta.glob('/src/assets/head-bg.png');
  const imgSrc = ref('');
  
  imgUrl['/src/assets/head-bg.png']().then((module) => {
    imgSrc.value = (module as { default: string }).default;
  });
  //筛选跳转
  const vis = ref(false);
  const changeVis = () => {
    vis.value = false;
  };
  const handleFilterClick = () => {
    vis.value = true;
  };
  //地区跳转
  const handleLocationClick = () => {
    router.push('/regionSelection');
  };
  
  
  const showMessage = (theme: string, content = 'Na', duration = 5000) => {
    if (Message[theme]) {
      Message[theme]({
        offset: [10, 16],
        content,
        duration,
        icon: true,
        zIndex: 20000,
        context: document.querySelector('#msgInfo'),
      });
    }
  };
  </script>
  
  <style lang="less" scoped>
  .wrapper {
    --td-tab-track-thickness: 0px;
  }
  .t-cell {
    margin-bottom: 8px;
    --td-picker-border-radius:6px;
  }
  .header-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 375px;
    height: 163px;
    background: white;
    z-index: 0;
  }
  .header-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 375px;
    height: 163px;
    z-index: 1;
  }
  .bottom-tab-bar {
    position: fixed;
    bottom: 24px;
    width: 100%;
  }
  
  img {
    display: block;
    width: 100%;
    height: 192px;
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
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .example-search {
    width: 343px;
    background-color: #fff;
    padding: 21px 0px;
  }
  .t-tabs {
    margin-bottom: 16px;
  }
  
  .label-content {
    display: flex;
    align-items: center;
    justify-content: center;
  
    span {
      margin-left: 3px;
    }
  }
  
  .search-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #f8f8f8;
    padding: 5px;
    box-sizing: border-box;
    z-index: 1000;
  }
  
  .search-box input {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  
  .container {
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    //align-items: center;
  }
  
  .placeholder {
    height: 80px;
  }
  
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 166px;
    height: 28px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* padding-left: 16px; */
    width: 100%;
  }
  
  .sticky_ {
    position: -webkit-sticky;
    position: sticky;
    top: 194px;
    // height: 48px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* padding-left: 16px; */
    width: 100%;
  }
  
  .sticky-content {
    width: 100%;
    background: #fff;
    padding-left: 16px;
    box-sizing: border-box;
    height: 28px;
    opacity: 1;
    color: #000000e6;
    font-size: 20px;
    font-weight: 600;
    font-family: 'PingFang SC';
    text-align: left;
    line-height: 28px;
  }
  
  .other-content {
    width: 343px;
    height: 120px;
    border-radius: 9px;
    opacity: 1;
    background: #fff;
    box-shadow: 0 6px 30px 5px #0000000d, 0 16px 24px 2px #0000000a,
      0 8px 10px -5px #00000014;
    margin-bottom: 20px;
  }
  
  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.3333rem;
    height: 1.28rem;
    position: absolute;
    margin-left: 6.6667rem;
    margin-top: 11.7067rem;
    //border-left: 1px solid #e7e7e7ff;
    border-bottom: 0.5px solid #e7e7e7ff;
  }
  .filter_ {
    width: 3.3333rem;
    height: 0.5867rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #e7e7e7ff;
  }
  .t-message__text {
    line-height: 55px;
  }
  </style>
  