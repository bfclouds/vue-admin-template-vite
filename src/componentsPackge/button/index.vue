<template>
  <el-button type="primary">{{ props.btnText }}</el-button>
</template>
<script setup lang="ts">

const props = defineProps({
  btnText: {
    type: String,
    default: '按钮'
  }
})
</script>