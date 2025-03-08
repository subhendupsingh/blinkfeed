import { articles, categories, rssFeeds } from '$lib/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq, desc } from 'drizzle-orm';
import type { ArticleWithRSSFeedAndCategory } from '$lib/types';

export const GET: RequestHandler = async ({ locals: { db }, url }) => {
    try {
        const page = Number(url.searchParams.get('page')) || 1;
        const limit = Number(url.searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;
        const response: ArticleWithRSSFeedAndCategory[] = await db.select().from(articles)
            .innerJoin(rssFeeds, eq(articles.rssFeedId, rssFeeds.id))
            .innerJoin(categories, eq(rssFeeds.categoryId, categories.id))
            .limit(limit).offset(offset)
            .orderBy(desc(articles.pubDate));
        return json(response);
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
};