import http from '../index';
import { Detail, News, User } from '../interface';

// 获取今日新闻信息 & 轮播图信息
const queryNewsLatest = () => http.get<News.NewsList>('/news_latest');

// 获取往日新闻信息 这个接口传入一个日期，获取这个日期后一天的新闻，如传入20230612 -> 获取的是20230611的数据
const queryNewsBefore = (time: string) => {
  return http.get<News.NewsItemType>('/news_before', {
    time
  });
};

// 获取新闻详情信息
const queryNewsInfo = (id: string) => {
  return http.get<Detail.NewsDetail>('/news_info', {
    id
  });
};

// 发送验证码
const sendPhoneCode = (params: { phone: string }) => {
  return http.post<{ code: string | number }>('/phone_code', params);
};

// 登录接口
const login = (params: { phone: string; code: string }) => {
  return http.post<User.Login>('/login', params);
};

// 获取用户信息
const queryUserInfo = () => http.get<User.UserInfo>('/user_info');

// 获取收藏信息
const storeList = () => http.get<User.StoreInfo>('/store_list');

// 收藏
const store = (params: { newsId: string | number }) => http.post<{ code: string | number }>('/store', params);

// 移除收藏
const storeRemove = (id: string | number) =>
  http.get<{ code: string | number }>('/store_remove', {
    id
  });

// 上传
const upload = (file: File) => {
  let fm = new FormData();
  fm.append('file', file);
  return http.post<{ code: string | number; pic: string }>('/upload', fm);
};

// 修改信息
const userUpdate = (params: { username: string; pic: string }) => {
  return http.post<{ code: string | number }>('/user_update', params);
};

const request = {
  queryNewsLatest,
  queryNewsBefore,
  queryNewsInfo,
  sendPhoneCode,
  login,
  queryUserInfo,
  storeList,
  store,
  storeRemove,
  upload,
  userUpdate
};

export default request;
