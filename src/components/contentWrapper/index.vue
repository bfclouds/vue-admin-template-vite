<template>
  <div class="content-wrapper no-scroll-bar">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
  .content-wrapper {
    height: 100%;
    padding: 20px;
    background-color: #fff;
    overflow: scroll;
  }
</style>