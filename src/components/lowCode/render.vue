<template>
  <draggable 
    class="h-full"
    :group="{ name: 'comp'}"
    :list="props.modelValue"
    item-key="id">
      <template #item="{element}: {element: CompsModules}">
        <component
          :class="{'low-code-active-item': element.schemaJson.isSelected}"
          :style="element.schemaJson.uiSchema"
          @click.stop="updateAvtiveCompData(element)"
          v-model="element.schemaJson.children"
          :is="element.component.default"></component>
      </template>
  </draggable>
</template>
<script setup lang="ts">
import { CompsModules } from '/@/components/lowCode/type'
import draggable from 'vuedraggable'
import { inject, PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<CompsModules[]>,
    default: () => []
  },
})

const updateAvtiveCompData = inject('updateAvtiveCompData') as Fn
</script>