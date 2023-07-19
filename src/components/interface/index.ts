import { News } from '@/api/interface';

export interface NewsItemProps {
  info: Partial<News.storyItem> | null;
}
