export interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface BreakingNewsArticle {
  title: string;
  url: string;
}
