export interface RequestOptions {
  // 将参数添加到url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  // 解析response的内容
  isTransformResponse?: boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean
  // Whether to join url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode
  // 是否添加time
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // 是否携带token
  withToken?: boolean
  // 请求重试机制
  retryRequest?: RetryRequest
}
