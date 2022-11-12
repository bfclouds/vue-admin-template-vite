declare  module '*.vue' {
  import {ComponentOptions} from 'vue'
   const componentOptions:ComponentOptions
   export default componentOptions
}


declare global {}

declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null


type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  currentTarget: T
}