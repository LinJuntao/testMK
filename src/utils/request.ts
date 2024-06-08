import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Message } from 'tdesign-mobile-vue'; // 引入TDesign的Message模块
import router from '../router/index';

//创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true, // 异步请求携带cookie
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

//请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如设置token
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = token;
    }
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
    // 在这里判断响应是否符合预期的结构，如果不符合则抛出错误
    if (response.data && response.data.response) {
      // console.log(response);
      if (!response.config.noshowMsg) {
        Message.success(response.data.msg); // 显示成功提示框
      }
      // Message.success(response.data.msg); // 显示成功提示框
      return response;
    } else {
      Message.error(response.data.msg);
      throw new Error('响应数据格式错误');
    }
  },
  (error) => {
    //处理网络错误
    let msg = '';
    console.log(error);
    const status = error.response ? error.response.status : undefined;
    switch (status) {
      case 401:
        msg = 'token过期';
        router.push({ name: 'Home' });
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
    Message.error(msg); // 显示错误提示框
    return Promise.reject(error);
  }
);

export default request;
