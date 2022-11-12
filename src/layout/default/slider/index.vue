<template>
  <el-aside
    :width="getMixSideWidth"
    class="overflow-hidden best-slider-bar-container no-scrollbar h-full z-40 bg-white"
  >
    <div class="header-logo-wrapper">
      <a href="/" class="inline-flex items-center w-full">
        <span
          class="logo-container left-0 top-0 fixed flex justify-center items-center"
        >
          <img :src="logoImg" alt="" />
        </span>
        <p class="title text-2xl w-full text-center">卓拙科技</p>
      </a>
    </div>
    <el-tabs tab-position="left" :model-value="activeRoute[0]">
      <el-tab-pane
        v-for="route in menuList"
        :key="route.name"
        :name="route.path"
      >
        <template #label>
          <router-link :to="route.path">
            <div class="best-column-grid flex-col rounded-md">
              <div>
                <i
                  class="iconfont text-lg leading-none"
                  :class="route.icon"
                ></i>
                <p class="mt-1">{{ route.name }}</p>
              </div>
            </div>
          </router-link>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-menu
      :default-active="activeRoute.at(-1)"
      :default-openeds="openedMenus"
      class="best-menu"
      router
    >
      <el-divider>{{ activeRouteName }}</el-divider>

      <template v-for="item in subMenuList" :key="item.path">
        <template v-if="!item.meta?.hideMenu">
          <template v-if="!item.children || item.children.length === 0">
            <el-menu-item class="mr-2 ml-2 rounded-md" :index="item.path">
              <div class="p-1">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </div>
            </el-menu-item>
          </template>
          <template v-else>
            <el-sub-menu :index="item.path">
              <template #title>
                <div class="p-1">
                  <i class="iconfont" :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </div>
              </template>
              <el-menu-item
                v-for="subMenuItem in item.children"
                :key="subMenuItem.path"
                class="mr-2 ml-2 mt-2 rounded-md"
                :index="subMenuItem.path"
              >
                <div class="p-1">
                  <i class="iconfont" :class="subMenuItem.icon"></i>
                  <span>{{ subMenuItem.name }}</span>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
  import { useMenus } from './index'
  import logoImg from '/@/assets/logo.png';

  const {
    menuList,
    subMenuList,
    activeRouteName,
    getMixSideWidth,
    activeRoute,
    openedMenus,
  } = useMenus()
</script>

<style lang="less" scoped>
  // @import '~/@/style/common.less';

  @elTabwidth: 64px;
  @sliderWidth: 300px;
  @bgColor: #282c34;

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .best-slider-bar-container {
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    background-color: var(--el-color-white);
    transition: width 0.2s cubic-bezier(0.17, 0.67, 0.68, 1.02);
    .header-logo-wrapper {
      .logo-container {
        width: @elTabwidth;
        height: @elTabwidth;
        background-color: @bgColor;
        img {
          width: 32px;
        }
      }
      .title {
        height: calc(@elTabwidth - 4px);
        width: calc(@sliderWidth - @elTabwidth);
        margin-left: @elTabwidth;
        padding-right: 15px;
        padding-left: 15px;
        color: var(--el-color-black);
        line-height: 55px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
    }
    :deep(.el-tabs) {
      position: fixed;
      top: @elTabwidth;
      width: @elTabwidth;
      border-right: none !important;
      .el-tabs__header {
        margin-right: 0 !important;
      }
      .el-tabs__nav {
        padding: 0;
        height: calc(100vh - @elTabwidth);
        background-color: @bgColor;
        .el-tabs__active-bar {
          display: none;
        }
        .el-tabs__item {
          width: @elTabwidth;
          padding: 6px;
          line-height: initial;
          height: auto;
          color: var(--el-color-white);
          .best-column-grid {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: nowrap;

            padding: 6px 0;
            flex-direction: column;
            width: 100%;
          }
          &.is-active {
            .best-column-grid {
              background: var(--el-color-primary);
            }
          }
        }
      }
    }
    :deep(.best-menu.el-menu) {
      border-right-color: transparent;
      margin-left: @elTabwidth;
      .el-divider {
        width: calc(@sliderWidth - @elTabwidth);
        margin: 0 0 20px 0;
        background-color: #f6f6f6;
        .el-divider__text {
          color: var(--el-color-black) !important;
        }
      }
      .el-menu-item {
        margin-bottom: 10px;
        &.is-active {
          background-color: var(--el-menu-hover-bg-color);
        }
      }
      .iconfont {
        margin-right: 10px;
      }
    }
  }
</style>
