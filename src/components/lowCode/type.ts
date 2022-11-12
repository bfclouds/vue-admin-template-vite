import { Component } from 'vue'
import { CompSchema } from '/@/componentsPackge/type'

export interface CompConfig {
  [key: string]: any
}
export interface CompsModules {
  id?: string
  schemaJson: CompSchema,
  component: {
    default: any
  }
}