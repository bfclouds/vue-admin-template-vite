import axios, { Canceler, AxiosRequestConfig } from 'axios'
import { isFunction } from '@/utils/is'

let pendingMap = new Map<string, Canceler>()
const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&')

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancler: Canceler) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancler)
        }
      })
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
