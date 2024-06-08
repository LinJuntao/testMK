<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found">
    <img src="../../assets/404.png" width="100%" />
    <div>404 - Page Not Found</div>
    <div>Sorry, the page you are looking for does not exist.</div>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>
<script lang="ts">
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  width: 100%;
  text-align: center;
  font-size: 25px;
  margin-top: 6px;
}
</style>
