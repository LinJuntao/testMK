<template>
  <div class="app-contain">
    <HomeNav title="签收" :isGoPrevious="1" pathURL="/location"></HomeNav>
    <div class="box">签收</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, h, onBeforeMount } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';
import HomeNav from '../../components/HomeNav.vue';
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
}
</style>
