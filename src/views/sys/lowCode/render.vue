<template>
  <div>
    render
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Comp {
  [key:string]: any
}

const comps = ref<Comp>({})
window.addEventListener('message', (e) => {
  // 不接受消息源来自于当前窗口的消息
  if (e.source === window || e.data === 'loaded') {
    return;
  }
  comps.value[e.data.type](e.data.data);
});



</script>