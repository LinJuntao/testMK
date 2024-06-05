import request from '../../utils/request';

export const reqActivityInfo = (url: string) => {
  return request.get(url);
};

export const reqGet = (url: string) => {
  return request({
    url: url,
    method: 'get'
  });
};

export const reqPost = async (url: string, data: any) => {
  return request({
    url: url,
    method: 'post',
    data: data
  });
};

//  获取角色组织
export const GetUserOrgList = async (data: any) => {
  const res = await request({
    url: '/Login/GetUserOrgList',
    method: 'get',
    params: data
  });
  return res.data;
};

// 登录
export const LoginGetToken = async (data: any) => {
  const res = await request({
    url: '/Login/GetToken',
    method: 'get',
    params: data
  });
  return res.data;
};

// 获取菜单
export const GetMenu = async (data: any) => {
  const res = await request({
    url: '/permission/GetMenu',
    method: 'get',
    params: data
  });
  return res.data;
};
