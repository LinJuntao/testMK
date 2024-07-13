<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

// import Home from './pages/home/index.vue';
</script>

<style lang="less">
.app {
  width: 100%;
  height: 100%;
}
/* 未选中状态的样式 */
.uncheckedList {
  width: 20px;
  height: 20px;
  /* 这里可以添加未选中时的样式，例如背景色、边框等 */
  border: 1px solid #ccc; /* 边框示例 */
  background-color: #fff; /* 背景色示例 */
  text-align: center;
  cursor: pointer; /* 当鼠标悬停时显示为可点击状态 */
}

/* 选中状态的样式 */
.checkedList {
  width: 20px;
  height: 20px;
  /* 这里可以添加选中时的样式，例如不同的背景色、边框等 */
  border: 1px solid #1890ff; /* 边框示例，颜色为蓝色 */
  background-color: #e6f7ff; /* 背景色示例，浅蓝色 */
  text-align: center;
  cursor: pointer; /* 当鼠标悬停时显示为可点击状态 */
}
</style>
