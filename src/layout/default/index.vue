<template>
  <div style="height: 100vh">
    <el-container class="h-full">
      <layout-slider></layout-slider>
      <el-container direction="vertical" class="h-full">
        <layout-header></layout-header>
        <layout-content class="overflow-y-scroll"></layout-content>
        <!-- <layout-footer></layout-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
  import LayoutHeader from './header/index.vue'
  import LayoutSlider from './slider/index.vue'
  import LayoutContent from './content/index.vue'
  // import LayoutFooter from './footer/index.vue'
</script>
