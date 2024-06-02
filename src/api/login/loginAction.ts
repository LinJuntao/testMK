import request from '../../utils/request';

export const reqActivityInfo = (url: string) => {
    return request.get(url);
  };
  
  

export const reqGet = (url: string) => {
    //return request.get(url);
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
