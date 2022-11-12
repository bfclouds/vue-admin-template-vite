<template>
  <el-header class="best-layout-header">
    <div class="best-nav">
      <div class="left flex items-center">
        <i
          class="iconfont icon-zhankai text-2xl cursor-pointer"
          :class="{ 'rotate-180': !isHidedMenu }"
          @click="toggleHideMenu"
        ></i>
      </div>
      <div class="right flex justify-end items-center">
        <div>
          <i class="iconfont icon-quanping text-gray-600 mr-4 cursor-pointer" @click="fullScreen"></i>
        </div>
        <div>123</div>
      </div>
    </div>
    <div class="best-tabs">
      <el-tabs
        type="card"
        closable
        class="demo-tabs"
        v-model="currentIndex"
        @edit="closeTab"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.fullPath"
          :label="item.meta.title"
          :name="item.fullPath"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </el-header>
</template>
<script setup lang="ts">
  import { unref } from 'vue'
  import { useTabs } from '/@/hooks/web/useTabs'
  import { listenerRouteChange } from '/@/logics/mitt/routeChange'

  const {
    isHidedMenu,
    tabList,
    toggleHideMenu,
    addTab,
    currentIndex,
    closeTab,
  } = useTabs()

  listenerRouteChange((route) => {
    addTab(unref(route))
  })

  function fullScreen() {
    window.document.fullscreenElement?.requestFullscreen()
  }
</script>

<style lang="less" scoped>
  .el-header.best-layout-header {
    background-color: var(--el-color-white);
    padding: 0;
    height: auto;
    .best-nav {
      width: 100%;
      padding: 0 20px;
      display: flex;
      height: 60px;
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
      .left {
        flex: 0 0 50%;
      }
      .right {
        flex: 0 0 50%;
      }
    }
    .best-tabs {
      display: flex;
      align-items: flex-end;
      height: 50px;
      :deep(.el-tabs) {
        width: 100%;
        padding: 0 20px;
        .el-tabs__header {
          margin-bottom: 0;
          border-bottom-color: transparent;
          .el-tabs__nav {
            border: 0;
          }
          .el-tabs__item {
            border: 0;
            &:not(:first-child) {
              margin-left: -18px;
            }
            &:hover,
            &.is-active {
              padding: 0 30px 0 30px;
              // background: #dee1e6;
              background: #f6f6f6;
              color: var(--el-color-black);
              mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
              mask-size: 100% 100%;
            }
            &.is-active {
              color: var(--el-color-primary) !important;
              background: var(--el-color-primary-light-9) !important;
            }
          }
        }
      }
    }
  }
</style>
