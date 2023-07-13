import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ResultEnum } from './config/httpEnum';
import router from '@/router';
import { ResultData } from './interface/index';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean;
}

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 超时
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域允许携带凭证
  withCredentials: true
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('x-access-token', 'setToken');
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          return Promise.reject(data);
        }
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        if (!window.navigator.onLine) router.replace('/500');
        return Promise.reject(response);
      }
    );
  }

  // 封装常用的请求
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  declare<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' });
  }
}

export default new RequestHttp(config);
