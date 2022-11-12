<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="getTransitionName()" mode="out-in" appear>
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="Component" :key="route.fullPath" />
          </template>
          <template #fallback>Loading...</template>
        </suspense>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
  import { getTransitionName } from './transition'
</script>
