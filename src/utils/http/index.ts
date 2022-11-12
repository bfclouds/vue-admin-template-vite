import BAxios from './axios'
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { deepMerge } from '/@/utils'
import { ContentTypeEnum, ResultEnum } from '/@/enums/httpEnum'
import { clone } from 'lodash-es'
import { AxiosResponse } from 'axios'

const transform: AxiosTransform = {
  // 处理响应数据
  transformResponseHook: (response: AxiosResponse, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生头，在需要获取相应头时设置
    if (isReturnNativeResponse) {
      return response
    }
    // 不处理，直接返回data
    if (isTransformResponse) {
      return response.data
    }

    // 处理data
    const {
      data: { code, data, msg },
    } = response

    if (code === ResultEnum.SUCCESS) {
      return data
    } else if (code === ResultEnum.ERROR) {
      console.warn('error', msg)
    }

    return response
  },
  // 处理请求前参数
  beforeRequestHook: (config, options) => {
    const { joinPrefix, urlPrefix } = options
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }
    return config
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new BAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        withToken: true,
        transform: clone(transform),
        requestOptions: {
          joinPrefix: true,
          urlPrefix: '/api',
        },
      } as CreateAxiosOptions,
      opt || {}
    )
  )
}

export const defHttp = createAxios()
