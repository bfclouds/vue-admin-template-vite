// import {
//   GDialogType,
//   HandlerObj,
//   Message,
//   MessageType,
// } from '@/components/dialog/type'
// import { Page } from '@/types/config'
// import { cloneDeep } from 'lodash-es'
// import { onMounted, reactive, Ref, ref } from 'vue'

// export interface UseDataHandler<T> {
//   baseForm: T
//   selectedData: Ref<T[]>
//   getDataList: () => void
//   updateDataApi: (params: T) => Promise<unknown>
// }

// const loading = ref(false)

// export const useTable = <T>(
//   dataApi: (params: Omit<Page, 'total'>) => Promise<{
//     data: T[]
//     page: Page
//   }>
// ) => {
//   const tableData = ref<T[]>([]) as Ref<T[]>
//   const selectedData = ref<T[]>([]) as Ref<T[]>
//   const page = reactive<Page>({
//     total: 1,
//     size: 7,
//     current: 0,
//   })

//   onMounted(() => {
//     getDataList()
//   })

//   function getDataList() {
//     if (page.current >= page.total) {
//       return
//     }
//     loading.value = true

//     dataApi({
//       size: page.size,
//       current: page.current + 1,
//     })
//       .then((res) => {
//         const { page: resPage, data } = res
//         page.total = resPage.total
//         page.current = resPage.current
//         tableData.value = data
//       })
//       .finally(() => {
//         loading.value = false
//       })
//   }

//   function changePage() {
//     getDataList()
//   }

//   function select(selection: T[]) {
//     selectedData.value = selection
//   }
//   function selectAll(selection: T[]) {
//     selectedData.value = selection
//   }

//   return {
//     tableData,
//     changePage,
//     loading,
//     select,
//     selectAll,
//     selectedData,
//     page,
//     getDataList,
//   }
// }
// export const useSearch = <T>(searchApi: (keh: string) => Promise<T[]>) => {
//   const searchKey = ref<Nullable<string>>(null)
//   const searchTableData = ref<Nullable<T[]>>(null) as Ref<Nullable<T[]>>
//   const searchMode = ref(false)

//   function onSearch() {
//     if (!searchKey.value) {
//       return
//     }
//     searchMode.value = true
//     loading.value = true
//     searchApi(searchKey.value)
//       .then((res: T[]) => {
//         searchTableData.value = res
//       })
//       .finally(() => {
//         loading.value = false
//       })
//   }

//   function onSearchInput(value: string) {
//     if (value === '') {
//       searchMode.value = false
//     }
//   }

//   return {
//     searchMode,
//     searchKey,
//     onSearch,
//     onSearchInput,
//     searchTableData,
//   }
// }
// export const useDataHandler = <T>({
//   baseForm,
//   selectedData,
//   getDataList,
//   updateDataApi,
// }: UseDataHandler<T>) => {
//   const formVisible = ref(false)
//   const dataForm = ref<T>(cloneDeep(baseForm)) as Ref<T>
//   const sureDialog = ref<Nullable<GDialogType>>(null)

//   function setUserForm(info = baseForm) {
//     dataForm.value = cloneDeep(info)
//   }

//   function edit(index: number, data: T) {
//     setUserForm(data)
//     formVisible.value = true
//   }

//   function addData() {
//     setUserForm()
//     formVisible.value = true
//   }

//   function showTipsToSure(data: T | T[], message: Message): HandlerObj {
//     return sureDialog.value?.show(data, message) as HandlerObj
//   }
//   function deleteData(data: T) {
//     showTipsToSure(data, {
//       type: MessageType.delete,
//       txt: '确定要删除该用户吗？',
//     }).on((d: T) => {
//       // console.log(1235, d)
//     })
//   }

//   function deleteSelectedData() {
//     console.log(1)
//   }

//   function formCancel() {
//     formVisible.value = false
//   }
//   function formConfirm() {
//     formVisible.value = false
//     updateDataApi(dataForm.value).then((res) => {
//       console.log(res)
//       getDataList()
//     })
//   }

//   return {
//     formVisible,
//     addData,
//     edit,
//     deleteData,
//     deleteSelectedData,
//     sureDialog,
//     dataForm,
//     formCancel,
//     formConfirm,
//   }
// }
