<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

// import Home from './pages/home/index.vue';
</script>

<style scoped lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
