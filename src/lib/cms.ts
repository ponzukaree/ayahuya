import contentData from '../data/content.json';

// 将来的にMicroCMS等の型定義に置き換えやすいようインターフェースを定義
export interface SiteInfo {
  title: string;
  tagline: string;
  description: string;
}

export interface HistoryItem {
  title: string;
  url: string;
}

export interface ProfileInfo {
  name: string;
  imageUrl: string;
  role: string;
  bio: string;
  skills: string[];
  history?: HistoryItem[];
}

export interface WorkInfo {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  images?: string[];
  boothUrl: string;
}

export interface ContactInfo {
  message: string;
  email: string;
  twitter: string;
  booth: string;
}

export interface PortfolioData {
  site: SiteInfo;
  profile: ProfileInfo;
  works: WorkInfo[];
  contact: ContactInfo;
}

/**
 * CMSデータ取得関数
 * 現在はローカルのJSONから取得していますが、MicroCMSを導入する際は
 * この関数の内部を `fetch('https://[YOUR_SERVICE].microcms.io/api/v1/...')` 
 * に書き換えるだけでサイト全体がMicroCMS対応になります。
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  // 意図：将来的な非同期API通信（MicroCMS等）を想定し、Promiseでラップして早期に非同期設計にしておく。
  return new Promise((resolve) => {
    // 擬似的なネットワーク遅延などは入れず、即座にローカルJSONを返す
    resolve(contentData as PortfolioData);
  });
}
