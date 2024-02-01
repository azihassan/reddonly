export interface IThread {
  kind: string;
  data: {
    id: string;
    permalink: string;
    url: string;
    title: string;
    selftext: string;
    selftext_html: string;
    subreddit: string;
    name: string;
    ups: number;
    downs: number;
    num_comments: number;
  };
}
