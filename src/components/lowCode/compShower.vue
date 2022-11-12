<template>
  <draggable 
    class="flex justify-between flex-wrap "
    :list="compList" 
    :sort="false"
    :clone="cloneDrag"
    :group="{ name: 'comp',  pull: 'clone', put: false }"
    item-key="id">
      <template
        #item="{element}">
        <div
          class="w-16 text-center bg-gray-100 rounded-md p-2 mb-2 cursor-move select-none">
          <i class="iconfont text-xl" :class="element?.schemaJson.icon"></i>
          <p class="">{{ element?.schemaJson.description }}</p>
        </div>
      </template>
  </draggable>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { CompsModules } from '/@/components/lowCode/type';
import draggable from 'vuedraggable'
import { cloneDeep } from 'lodash';
import { randomString } from '/@/utils';

  const props = defineProps({
    config: {
      type: Map<string, CompsModules>,
      default: () => new Map()
    }
  })

  const compList = computed(() => {
    const res = []
    const keys = props.config.keys()
    for (const k of keys) {
      res.push(props.config.get(k))
    }
    return res
  })

  function cloneDrag(comp: CompsModules) {
    const id = `${comp.schemaJson?.name}_${randomString(12)}`
    return cloneDeep({
      id,
      ...comp
    })
  }

</script>