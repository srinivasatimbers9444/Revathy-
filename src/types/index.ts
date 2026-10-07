export interface Milestone {
  id: string;
  yearOrDate: string;
  title: string;
  category: string;
  description: string;
  poeticSnippet: string;
  imageUrl?: string;
  iconName?: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  preview: string;
  content: string;
  date: string;
  waxColor: string;
  sender: string;
  recipient: string;
}

export interface ReasonItem {
  id: string;
  number: number;
  text: string;
  category: 'Your Soul' | 'Your Smile' | 'Little Moments' | 'Our Future';
  isFavorite?: boolean;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  caption: string;
  backNote: string;
}

export interface VowStar {
  id: number;
  title: string;
  vow: string;
  xPercent: number;
  yPercent: number;
  unlocked: boolean;
}
