<template>
  <div>
    <div v-for="(item, index) in formSchema" :key="`${props.modelValue.id}_${index}`">
      <div>
        <span>{{ item.label }}: </span>
        <el-input v-model="item.value" @input="changeInput(item)">
          <template v-if="item.unit" #append>{{ item.unit }}</template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CompsModules } from '/@/components/lowCode/type'
import { computed, PropType } from 'vue'
import { FormSchema } from '/@/componentsPackge/type';
import MarginInput from '../../componentsForm/marginInput.vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<CompsModules>,
    required: true
  },
})

const formSchema = computed(() => props.modelValue.schemaJson.formSchema)
const uiSchema = computed(() => props.modelValue.schemaJson.uiSchema)

function changeInput(item: FormSchema) {
  if (typeof item.value === 'object' && item.value !== null) {
    Object.keys(item.value).forEach(k => {
      console.log(k);
      
      uiSchema.value[k] = `${item.value[k]}${item.unit||''}`
    })
  } else if (typeof item.value === 'string') {
    uiSchema.value[item.key] = `${item.value}${item.unit||''}`
  }
}

</script>