<template>
  <div class="card-contianer">
    <t-navbar
      class="tnavbar"
      :title="title"
      :title-max-length="10"
      :fixed="false"
    >
      <template #capsule>
        <div class="custom-capsule">
          <t-icon
            name="chevron-left"
            size="20px"
            class="custom-capsule__icon"
            @click="handleClick('chevron')"
          />
          <t-divider layout="vertical" />
          <t-icon
            name="home"
            size="20px"
            class="custom-capsule__icon"
            @click="handleClick('home')"
          />
        </div>
      </template>
    </t-navbar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// isGoPrevious 表示是否为上一页， 0 是  1 自定义路径
const props = defineProps<{
  title: string;
  isGoPrevious: number;
  pathURL: string;
}>();

const handleClick = (val: string) => {
  if (val === 'chevron') {
    if (props.isGoPrevious === 0) {
      router.back();
    } else if (props.isGoPrevious === 1) {
      router.push({
        path: props.pathURL
      });
    }
  } else if (val === 'home') {
    router.push({
      name: 'location'
    });
  }
  console.log('left-click', val);
};
</script>
<style scoped lang="less">
.card-contianer {
  width: 100%;
  font-size: 15px;
  position: relative;
  border-bottom: 1px solid gainsboro;
  .tnavbar {
    width: 100%;
    height: 48px;
  }
}

// .t-navbar {
//   margin-bottom: 16px;
// }

.t-icon-close {
  margin: 0 8px;
}

.t-icon-home {
  margin-right: 8px;
}

.custom-capsule {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-capsule__icon {
  flex: 1;
  position: relative;
  margin: 0;
}

.custom-capsule :deep(.t-divider--vertical-center) :deep(.t-divider--vertical) {
  margin: 0;
}
.t-demo-iconfont {
  .t-icon {
    margin-right: 24px;
  }
}
</style>
