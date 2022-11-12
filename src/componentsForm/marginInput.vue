<template>
  <div class="margin-input">
    <div class="center">
      <el-input class="absolute transform top-0 -translate-y-full mb-20" v-model="data.marginTop" />
      <el-input class="absolute transform right-0 translate-x-full ml-20" v-model="data.marginRight" />
      <el-input class="absolute transform bottom-0 translate-y-full mt-20" v-model="data.marginBottom" />
      <el-input class="absolute transform left-0 -translate-x-full mr-20" v-model="data.marginLeft" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref, watch } from 'vue'

interface ModelValue {
  marginTop: number
  marginLeft: number
  marginRight: number
  marginBottom: number
}

defineProps({
  unit: {
    type: String,
    default: 'px'
  },
  modelValue: {
    type: Object as PropType<ModelValue>,
    required: true
  }
})

const data = ref<ModelValue>({
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0
})

const emit = defineEmits(['update:modelValue'])
watch(() => data.value, () => {
  emit('update:modelValue', data)
}, {
  deep: true
})

</script>

<style lang="less" scoped>
.margin-input {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 40px;
    height: 30px;
    background-color: #eee;
    input {
      width: 100%;
      height: 100%;
    }
  }
}
</style>