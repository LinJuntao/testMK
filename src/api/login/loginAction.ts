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
export const GetUserOrgList = (data: any) => {
  return request({
    url: '/Login/GetUserOrgList',
    method: 'get',
    params: data
  });
};

// 登录
export const LoginGetToken = (data: any) => {
  return request({
    url: '/Login/GetToken',
    method: 'get',
    params: data
  });
};
