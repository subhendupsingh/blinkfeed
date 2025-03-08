import type { articles, categories, rssFeeds, subcategories } from "$lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Article = InferSelectModel<typeof articles>;
export type RSSFeed = InferSelectModel<typeof rssFeeds>;
export type Category = InferSelectModel<typeof categories>;
export type Subcategory = InferSelectModel<typeof subcategories>;
export type ArticleWithRSSFeedAndCategory =  {
    articles: Article;
    rss_feeds: RSSFeed;
    categories: Category;
};
