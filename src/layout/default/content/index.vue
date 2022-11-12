<template>
  <el-main class="best-layout-content no-scroll-bar">
    <PageLayout />
  </el-main>
</template>
<script setup lang="ts">
  import PageLayout from '../../page/index.vue'
</script>

<style lang="less" scoped>
  .best-layout-content {
    padding: 2px;
    border-radius: 0;
    background-color: transparent;
  }
</style>
