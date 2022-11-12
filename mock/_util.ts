import { ResultEnum } from '../src/enums/httpEnum'

export function resultSuccess<T = Recordable>(data: T, { msg = 'ok' } = {}) {
  return {
    code: ResultEnum.SUCCESS,
    data,
    msg,
  }
}
