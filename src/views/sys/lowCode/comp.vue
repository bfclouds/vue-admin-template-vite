<template>
  <div>
    组件
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const cmps = ref([])

function getAllCompsConfig() {
  const modules = import.meta.glob('../../../componentsPackge/*/package.json')
  const componentConfig = Object.keys(modules).map((k: string) => {
    const i = k.indexOf('/componentsPackge')
    return k.slice(i)
  })
  return componentConfig
}

onMounted(() => {
  getAllCompsConfig()
})


</script>