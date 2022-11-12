import { RequestOptions } from '@/style/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions
  transform?: AxiosTransform
}

export abstract class AxiosTransform {
  transformResponseHook?: (
    response: AxiosResponse,
    options: RequestOptions
  ) => any
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig
}
