import { defHttp } from '/@/utils/http';

enum Api {
  GetMenuList = '/getMenuList',
}

const menuApi = {
  getMenuList: () => {
    return defHttp.get({ url: Api.GetMenuList })
  }
}

export default menuApi