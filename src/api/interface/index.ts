// 请求响应参数(不包含data)
export interface Result {
  code?: string;
  msg?: string;
}

// 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data?: T;
}

// 新闻列表相关类型
export namespace News {
  export interface storyItem {
    ga_prefix: string;
    hint: string;
    id: string | number;
    image_hue: string;
    images: string[];
    title: string;
    type: number;
    image: string;
  }
  export type topStoryItem = Omit<storyItem, 'images'> & { image: string };

  export interface NewsList {
    date: string;
    stories: storyItem[];
    top_stories: topStoryItem[];
  }

  export interface NewsItemType {
    date: string;
    stories: storyItem[];
  }
  export interface StateType {
    today: string;
    newsList: Array<NewsItemType>;
    banners: topStoryItem[];
  }
}

// 详情的相关类型
export namespace Detail {
  export interface NewsDetail {
    body: string;
    css: string[];
    ga_prefix: string;
    id: string | number;
    image: string;
    image_hue: string;
    images: string[];
    title: string;
  }
}

// 用户相关类型
export namespace User {
  export interface Login {
    code: string | number;
    token: string;
  }

  export interface UserInfo {
    code: string | number;
    data: {
      id: string | number;
      name: string;
      phone: string;
      pic: string;
    };
  }

  export type StoreItem = Pick<News.topStoryItem, 'image' | 'title' | 'id'>;
  export interface StoreInfo {
    code: string | number;
    data: Array<{ id: string | number; news: StoreItem }> | [];
  }
}
