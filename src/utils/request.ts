import axios, { AxiosResponse } from 'axios';

// 定义响应数据的接口
interface MyInfoResponse {
  msg: string;
  msgDev: string;
  response: any;
  status: number;
  success: boolean;
}

//创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json',
    // 'token': 'your token',
    'X-Requested-With': 'XMLHttpRequest'
  }
});
//请求拦截器
request.interceptors.request.use(
  (config) => {
    // // 在发送请求之前做些什么，比如设置token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msg = '';
    console.log(error);
    const status = error.response ? error.response.status : undefined;
    switch (status) {
      case 401:
        msg = 'token过期';
        break;
      case 403:
        msg = '无权访问';
        break;
      case 404:
        msg = '请求地址错误';
        break;
      case 500:
        msg = '服务器出现问题';
        break;
      default:
        msg = '无网络';
    }
    return Promise.reject(error);
  }
);
export default request;
