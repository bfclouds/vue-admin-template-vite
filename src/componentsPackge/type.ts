export interface CompSchema {
  name: string // 组件名
  description: string // 组件描述
  version: string // 版本号
  icon: string // 组件图标
  isSelected: boolean // 是否选中
  children: CompSchema[] // 子组件
  uiSchema: UiSchema // 组件的ui的style值之类的，即formSchema表单中填的具体的值
  formSchema: FormSchema[] // form表单数据结构
}

interface UiSchema {
  [key: string]: string|number // key=>value的对象，如：{ width: 100px }
}

export interface FormSchema {
  type: string // formItem类型: text,radio,number,checkbox等
  label: string // input显示的名称
  key: string // style的key，如display,width,height,margin,padding等
  value: any // 值
  unit: string|undefined // 单位
}