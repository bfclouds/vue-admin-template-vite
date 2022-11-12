import { RequestOptions } from '/@/types/axios'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { cloneDeep } from 'lodash-es'
import { isFunction } from '../is'
import { CreateAxiosOptions } from './axiosTransform'

class BAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions
  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  get(config: AxiosRequestConfig, options?: RequestOptions) {
    return this.request({
      ...config,
      method: 'GET',
      ...options,
    })
  }
  post(config: AxiosRequestConfig, options?: RequestOptions) {
    return this.request({
      ...config,
      method: 'POST',
      ...options,
    })
  }

  request(config: AxiosRequestConfig, options?: RequestOptions) {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const transform = this.getTransform()
    const { beforeRequestHook, transformResponseHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          if (isFunction(transformResponseHook)) {
            const ret = transformResponseHook(res, opt)
            resolve(ret)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default BAxios
