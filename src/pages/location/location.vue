<template>
  <div class="app-contain">
    <HomeNav title="首页" :isGoPrevious="0"></HomeNav>
    <div class="box">
      <t-collapse expand-mutex :value="values" @change="handleChange">
        <t-collapse-panel
          v-for="(item, index) in menuOptions"
          :key="item.name"
          :value="index"
          :header="item.name"
        >
          <div class="content">
            <div
              class="avatar-demo"
              v-for="item2 in item.children"
              :key="item2.code"
              @click="changeBoxs(item2)"
            >
              <icon class="iconbox" :name="item2.icon" />
              <span class="titlebox">
                {{ item2.name }}
              </span>
            </div>
          </div>
        </t-collapse-panel>
      </t-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, h, onBeforeMount } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';
import HomeNav from '../../components/HomeNav.vue';
import { GetMenu } from '../../api/login/loginAction';
import { useRouter } from 'vue-router';
const router = useRouter();

const values = ref([0]);

const handleChange = (val: number[]) => {
  values.value = val;
};

const changeBoxs = (val: any) => {
  const code = val.code;
  router.push({
    path: code
  });
  // const code = data.code;
  console.log(code);
};

// 获取菜单
const menuOptions = ref<any[]>([]);
const getMenuList = async () => {
  const ref = await GetMenu({ menuType: 2 });
  menuOptions.value = ref.response;
  // console.log(ref);
  console.log(ref.response);
};

onMounted(async () => {
  await getMenuList();
});
</script>
<style lang="less" scoped>
.app-contain {
  width: 100%;
  height: 100%;
  font-size: 15px;
  position: relative;
  .box {
    width: 100%;
    height: 100%;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .avatar-demo {
      width: calc(25vw - 20px);
      margin-right: 10px;
      display: flex;
      flex-wrap: wrap;
      border-radius: 10px;
      border: 1px solid gainsboro;
      padding: 5px 0;
      margin-bottom: 10px;

      .iconbox {
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto;
      }
      .titlebox {
        width: 100%;
        text-align: center;
        font-size: 14px;
        padding-top: 10px;
      }
    }
  }
}
</style>
