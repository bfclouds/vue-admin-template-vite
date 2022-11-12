<template>
  <div class="p-10 bg-gray-100">
    <Render v-model:modelValue="modelValue"></Render>
  </div>
</template>
<script setup lang="ts">
import { CompsModules } from '/@/components/lowCode/type';
import Render from '/@/components/lowCode/render.vue';
import { PropType } from 'vue';

defineProps({
  modelValue: {
    type: Array as PropType<CompsModules[]>,
    default: () => []
  },
})
</script>