import { User } from '@/api/interface';

export interface GlobalState {
  token: string;
  userInfo: User.UserInfo['data'] | null;
  currentRoute: string;
}

export interface LikeStore {
  storeList: User.StoreInfo['data'];
}
