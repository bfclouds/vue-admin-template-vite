<template>
  <el-footer class="best-footer">Copyright 2022 Vue Admin Best</el-footer>
</template>
<style lang="less" scoped>
  .best-footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 16px;
    color: rgba(29, 31, 37, .45);
    background-color: #fff;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      background: linear-gradient(to right, rgba(29, 31, 37, .45), rgba(29, 31, 37, .45) 5px, transparent 5px, transparent);
      background-size: 10px 100%;
    }
  }
</style>
